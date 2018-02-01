<?php namespace App\Services\Billing\Gateways\Paypal;

use Omnipay\Omnipay;
use Omnipay\PayPal\RestGateway;
use App\Services\Billing\Gateways\Contracts\GatewayInterface;

class PaypalGateway implements GatewayInterface
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

    /**
     * Get paypal plans service instance.
     * 
     * @return PaypalPlans
     */
    public function plans()
    {
        return $this->plans;
    }

    /**
     * Get paypal subscriptions service instance.
     * 
     * @return PaypalSubscriptions
     */
    public function subscriptions()
    {
        return $this->subscriptions;
    }
}