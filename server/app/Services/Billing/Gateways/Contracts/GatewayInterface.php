<?php namespace App\Services\Billing\Gateways\Contracts;

interface GatewayInterface
{
    /**
     * @return GatewaySubscriptionsInterface
     */
    public function subscriptions();

    /**
     * @return GatewayPlansInterface
     */
    public function plans();
}