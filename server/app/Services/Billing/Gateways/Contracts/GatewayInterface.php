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

    /**
     * Check if specified webhook is valid.
     *
     * @param array $payload
     * @return bool
     */
    public function webhookIsValid($payload);
}