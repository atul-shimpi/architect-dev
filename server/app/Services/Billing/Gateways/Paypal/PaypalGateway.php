<?php namespace App\Services\Billing\Gateways\Paypal;

use Omnipay\Omnipay;
use Omnipay\PayPal\RestGateway;

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
        $this->subscriptions = new PaypalSubscriptions($this->gateway, $this->plans);
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