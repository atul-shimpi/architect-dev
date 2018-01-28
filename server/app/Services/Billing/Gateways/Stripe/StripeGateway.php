<?php namespace App\Services\Billing\Gateways\Stripe;

use App\Services\Billing\GatewayException;
use Omnipay\Common\CreditCard;
use Omnipay\Common\Exception\InvalidCreditCardException;
use Omnipay\Omnipay;
use Omnipay\Stripe\Gateway;
use Vebto\Auth\User;

class StripeGateway
{
    /**
     * @var Gateway
     */
    private $gateway;

    /**
     * @var StripePlans
     */
    private $plans;

    /**
     * @var StripeSubscriptions
     */
    private $subscriptions;

    /**
     * StripeGateway constructor.
     */
    public function __construct()
    {
        $this->gateway = Omnipay::create('Stripe');

        $this->gateway->initialize(array(
            'apiKey' => config('services.stripe.key'),
        ));

        $this->plans = new StripePlans($this->gateway);
        $this->subscriptions = new StripeSubscriptions($this->gateway);
    }

    public function plans()
    {
        return $this->plans;
    }

    public function subscriptions()
    {
        return $this->subscriptions;
    }

    /**
     * Add a new card to customer on stripe.
     *
     * @param User $user
     * @param array $cardData
     * @return User
     * @throws GatewayException
     * @throws InvalidCreditCardException
     */
    public function addCard(User $user, $cardData)
    {
        $params = ['card' => new CreditCard([
            'number' => $cardData['number'],
            'expiryMonth' => $cardData['expiration_month'],
            'expiryYear' => $cardData['expiration_year'],
            'cvv' => $cardData['security_code'],
            'email' => $user->email,
            'firstName' => $user->first_name,
            'lastName' => $user->last_name,
        ])];

        //create new stripe customer or attach to existing one
        if ($user->stripe_id) {
            $params['customerReference'] = $user->stripe_id;
        } else {
            $params['email'] = $user->email;
        }

        $response = $this->gateway->createCard($params)->send();

        if ( ! $response->isSuccessful()) {
            $data = $response->getData();

            //if card validation fails on stripe, throw exception so we can show message to user
            if (isset($data['error']['type']) && $data['error']['type'] === 'card_error') {
                throw new InvalidCreditCardException($data['error']['message']);
            }

            throw new GatewayException('Could not create stripe credit card.');
        }

        //store stripe id on user model, if needed
        if ($user->stripe_id !== $stripeId = $response->getCustomerReference()) {
            $user->fill(['stripe_id' => $stripeId])->save();
        }

        //TODO: check if user has more then one card
        $this->setDefaultCustomerSource($user, $response->getCardReference(), $response->getData());

        return $user;
    }

    /**
     * Change default customer payment source to specified card.
     *
     * @param User $user
     * @param string $cardReference
     * @param array $cardData
     * @return null|string
     * @throws GatewayException
     */
    public function setDefaultCustomerSource(User $user, $cardReference, $cardData)
    {
        $response = $this->gateway->updateCustomer([
            'customerReference' => $user->stripe_id,
        ])->sendData(['default_source' => $cardReference]);

        if ( ! $response->isSuccessful()) {
            throw new GatewayException('Could not create stripe credit card.');
        }

        $user->fill([
            'card_last_four' => $cardData['last4'],
            'card_brand'     => $cardData['brand'],
        ])->save();

        return $response->getCustomerReference();
    }
}