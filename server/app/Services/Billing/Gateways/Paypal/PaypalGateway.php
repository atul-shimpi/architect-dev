<?php namespace App\Services\Billing\Gateways\Stripe;

use App\Services\Billing\GatewayException;
use App\Services\Billing\Gateways\Paypal\PaypalPlans;
use App\Services\Billing\Gateways\Paypal\PaypalSubscriptions;
use Omnipay\Common\CreditCard;
use Omnipay\Common\Exception\InvalidCreditCardException;
use Omnipay\Omnipay;
use Omnipay\PayPal\RestGateway;
use Vebto\Auth\User;

class PaypalGateway
{
    /**
     * @var RestGateway
     */
    private $gateway;

    /**
     * @var PaypalPlans
     */
    private $plans;

    /**
     * @var PaypalSubscriptions
     */
    private $subscriptions;

    /**
     * StripeGateway constructor.
     */
    public function __construct()
    {
        $this->gateway = Omnipay::create('PayPal_Rest');

        $this->gateway->initialize(array(
            'clientId' => config('services.paypal.client_id'),
            'secret' => config('services.paypal.secret'),
            'testMode' => true,
        ));

        $this->plans = new PaypalPlans($this->gateway);
        $this->subscriptions = new PaypalSubscriptions($this->gateway);
    }

    public function plans()
    {
        return $this->plans;
    }

    public function subscriptions()
    {
        return $this->subscriptions;
    }
}