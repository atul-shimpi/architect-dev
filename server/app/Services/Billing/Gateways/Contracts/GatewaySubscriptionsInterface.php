<?php namespace App\Services\Billing\Gateways\Contracts;

use App\BillingPlan;
use App\Services\Billing\GatewayException;
use App\Subscription;
use Vebto\Auth\User;

interface GatewaySubscriptionsInterface
{
    /**
     * Cancel specified subscription on gateway.
     *
     * @param Subscription $subscription
     * @param bool $atPeriodEnd
     * @return boolean
     */
    public function cancel(Subscription $subscription, $atPeriodEnd = false);

    /**
     * Resume specified subscription on gateway.
     *
     * @param Subscription $subscription
     * @param array $params
     * @return bool
     * @throws GatewayException
     */
    public function resume(Subscription $subscription, $params);

    /**
     * Create a new subscription or subscription agreement on gateway.
     *
     * @param BillingPlan $plan
     * @param User $user
     * @param string|integer $startDate
     * @return array
     * @throws GatewayException
     * @throws \LogicException
     */
    public function create(BillingPlan $plan, User $user, $startDate = null);
}