<?php namespace App\Services\Billing\Gateways\Stripe;

use App\BillingPlan;
use Omnipay\Stripe\Gateway;
use App\Services\Billing\GatewayException;
use App\Services\Billing\Gateways\Contracts\GatewayPlansInterface;

class StripePlans implements GatewayPlansInterface
{

    /**
     * @var Gateway
     */
    private $gateway;

    /**
     * StripePlans constructor.
     *
     * @param Gateway $gateway
     */
    public function __construct(Gateway $gateway)
    {
        $this->gateway = $gateway;
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
     * Create a new plan on stripe gateway.
     *
     * @param BillingPlan $plan
     * @return bool
     * @throws GatewayException
     */
    public function create(BillingPlan $plan)
    {
        $response = $this->gateway->createPlan([
            'id' => $plan->uuid,
            'amount' => $plan->amount,
            'currency' => $plan->currency,
            'interval' => $plan->interval,
            'interval_count' => $plan->interval_count,
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