<?php namespace App\Services\Billing\Subscriptions\Gateways;

use App\BillingPlan;
use App\Services\Billing\GatewayException;
use App\Subscription;
use App\User;
use Omnipay\Common\CreditCard;
use Omnipay\Omnipay;
use Omnipay\Stripe\Gateway;

class StripeSubscriptions
{
    /**
     * @var Gateway
     */
    private $gateway;

    public function __construct()
    {
        $this->gateway = Omnipay::create('Stripe');

        $this->gateway->initialize(array(
            'apiKey' => config('services.stripe.key'),
        ));
    }

    /**
     * Create a new subscription on currently active gateway.
     *
     * @param BillingPlan $plan
     * @param User $user
     * @param array $cardData
     * @throws GatewayException
     * @return array
     */
    public function create(BillingPlan $plan, User $user, $cardData)
    {
        $user = $this->maybeCreateStripeCustomer($user, $cardData);
        return $this->createStripeSubscription($user, $plan);
    }

    public function cancel(Subscription $subscription)
    {
        $response = $this->gateway->cancelSubscription([
            'subscriptionReference' => $subscription->gateway_id,
            'customerReference' => $subscription->user->stripe_id,
            'at_period_end' => true,
        ])->send();

        if ( ! $response->isSuccessful()) {
            throw new GatewayException('Could not cancel stripe subscription.');
        }

        return $response->getData()['current_period_end'];
    }

    /**
     * Update specified subscription.
     *
     * @param Subscription $subscription
     * @param array $params
     * @return mixed
     * @throws GatewayException
     */
    public function update(Subscription $subscription, $params)
    {
        $response = $this->gateway->updateSubscription(array_merge([
            'plan' => $subscription->plan->uuid,
            'customerReference' => $subscription->user->stripe_id,
            'subscriptionReference' => $subscription->gateway_id,
        ], $params))->send();

        if ( ! $response->isSuccessful()) {
            throw new GatewayException('Could not update stripe subscription.');
        }

        return $response->getData();
    }

    /**
     * Create stripe customer for specified user, if not already created.
     *
     * @param User $user
     * @param array $cardData
     * @throws GatewayException
     * @return User
     */
    public function maybeCreateStripeCustomer(User $user, $cardData)
    {
        if ($user->stripe_id) return $user;

        $stripeId = $this->createStripeCustomer($user);
        $user->fill(['stripe_id' => $stripeId])->save();

        $this->createStripeCard($user, $cardData);

        return $user;
    }

    /**
     * Subscribe user to specified plan on stripe.
     *
     * @param User $user
     * @param BillingPlan $plan
     * @return array
     * @throws GatewayException
     */
    private function createStripeSubscription(User $user, BillingPlan $plan)
    {
        $response = $this->gateway->createSubscription([
            'customerReference' => $user->stripe_id,
            'plan' => $plan->uuid,
        ])->send();

        if ( ! $response->isSuccessful()) {
            throw new GatewayException('Could not create stripe subscription.');
        }

        return ['reference' => $response->getSubscriptionReference(), 'end_date' => 'current_period_end'];
    }

    /**
     * Create a new stripe customer.
     *
     * @param User $user
     * @throws GatewayException
     * @return string
     */
    private function createStripeCustomer(User $user)
    {
        $response = $this->gateway->createCustomer([
            'email' => $user->email,
        ])->send();

        if ( ! $response->isSuccessful()) {
            throw new GatewayException('Could not create stripe customer.');
        }

        /** @var \Omnipay\Stripe\Message\Response $response */
        return $response->getCustomerReference();
    }

    /**
     * Create a new card on stripe.
     *
     * @param User $user
     * @param array $cardData
     * @throws GatewayException
     */
    private function createStripeCard(User $user, $cardData)
    {
        $card = new CreditCard([
            'number' => $cardData['number'],
            'expiryMonth' => $cardData['expiration_month'],
            'expiryYear' => $cardData['expiration_year'],
            'cvv' => $cardData['cvc'],
            'email' => $user->email,
            'firstName' => $user->first_name,
            'lastName' => $user->last_name,
        ]);

        $response = $this->gateway->createCard([
            'card' => $card,
            'customerReference' => $user->stripe_id,
        ])->send();

        if ( ! $response->isSuccessful()) {
            throw new GatewayException('Could not create stripe credit card.');
        }
    }
}