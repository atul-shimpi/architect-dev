<?php namespace App\Services\Billing\Plans;

use App\BillingPlan;
use App\Services\Billing\GatewayException;
use App\Services\Billing\Plans\Gateways\GatewayPlansInterface;
use Omnipay\Omnipay;
use Omnipay\Stripe\Gateway;

class StripePlans implements GatewayPlansInterface
{

    /**
     * @var Gateway
     */
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
     * @param BillingPlan $plan
     * @throws GatewayException
     * @return bool
     */
    public function create(BillingPlan $plan)
    {
        $response = $this->gateway->createPlan([
            'id' => $plan->uuid,
            'amount' => $plan->amount,
            'currency' => $plan->currency,
            'interval' => $plan->interval,
            'name' => $plan->name,
        ])->send();

        if ( ! $response->isSuccessful()) {
            throw new GatewayException('Could not create subscription plan on stripe.');
        }

        return true;
    }

    /**
     * Delete specified billing plan from currently active gateway.
     *
     * @param BillingPlan $plan
     * @return bool
     */
    public function delete(BillingPlan $plan)
    {
        return $this->gateway->deletePlan(['id' => $plan->uuid])->send()->isSuccessful();
    }
}