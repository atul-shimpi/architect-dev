<?php namespace App\Services\Billing\Plans;

use Omnipay\Omnipay;

class GatewayPlans
{

    private $gateway;

    public function __construct()
    {
        $this->gateway = Omnipay::create('Stripe');

        $this->gateway->initialize(array(
            'apiKey' => 'sk_test_XkSUco6kDbp7cObW1fCDtALE',
        ));
    }

    /**
     * Create a new plan on currently active gateway.
     *
     * @param array $params
     */
    public function create($params)
    {
        dd($gateway->createPlan(['id' => 1, 'amount' => 10, 'currency' => 'usd', 'interval' => 'week', 'name' => 'test'])->send());
        dd($gateway->listPlans([])->send());
    }
}