<?php namespace App\Services\Billing\Plans\Gateways;

use App\BillingPlan;
use App\Services\Billing\GatewayException;

interface GatewayPlans
{
    /**
     * Find specified plan on gateway.
     *
     * @param BillingPlan $plan
     * @return array
     */
    public function find(BillingPlan $plan);

    /**
     * Create a new subscription plan on gateway.
     *
     * @param BillingPlan $plan
     * @throws GatewayException
     * @return bool
     */
    public function create(BillingPlan $plan);

    /**
     * Delete specified subscription plan from gateway.
     *
     * @param BillingPlan $plan
     * @throws GatewayException
     * @return bool
     */
    public function delete(BillingPlan $plan);
}