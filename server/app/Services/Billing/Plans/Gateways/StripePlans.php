<?php namespace App\Services\Billing\Plans\Gateways;

use App\BillingPlan;
use App\Services\Billing\GatewayException;
use Omnipay\Omnipay;
use Omnipay\Stripe\Gateway;

class StripePlans implements GatewayPlans
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
     * Find specified plan on stripe.
     *
     * @param BillingPlan $plan
     * @return array|null
     */
    public function find(BillingPlan $plan)
    {
        $response = $this->gateway->fetchPlan(['id' => $plan->uuid])->send();

        if ( ! $response->isSuccessful()) return null;

        return $response->getData();
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