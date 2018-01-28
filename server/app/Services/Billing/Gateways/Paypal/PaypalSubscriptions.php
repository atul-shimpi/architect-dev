<?php namespace App\Services\Billing\Gateways\Paypal;

use App\BillingPlan;
use App\Services\Billing\GatewayException;
use App\Subscription;
use Carbon\Carbon;
use Omnipay\PayPal\RestGateway;

class PaypalSubscriptions
{
    /**
     * @var RestGateway
     */
    private $gateway;

    /**
     * @var PaypalPlans
     */
    private $paypalPlans;

    /**
     * PaypalPlans constructor.
     * @param RestGateway $gateway
     * @param PaypalPlans $paypalPlans
     */
    public function __construct(RestGateway $gateway, PaypalPlans $paypalPlans)
    {
        $this->gateway = $gateway;
        $this->paypalPlans = $paypalPlans;
    }

    /**
     * Create subscription agreement on paypal.
     *
     * @param BillingPlan $plan
     * @return array
     * @throws GatewayException
     */
    public function createAgreement(BillingPlan $plan)
    {
        $response = $this->gateway->createSubscription([
            'name'        => config('app.name')." subscription: {$plan->name}.",
            'description' => "{$plan->name} subscription on ".config('app.name'),
            'planId' => $this->paypalPlans->getPlanId($plan),
            'startDate' => Carbon::now()->addMinute(),
            'payerDetails' => ['payment_method' => 'paypal'],
        ])->send();

        if ( ! $response->isSuccessful() || ! $response->isRedirect()) {
            throw new GatewayException('Could not create subscription agreement on paypal');
        }

        return [
            'approve' => "https://www.sandbox.paypal.com/checkoutnow?version=4&token={$response->getTransactionReference()}",
            'execute' => $response->getCompleteUrl(),
        ];
    }

    /**
     * Execute paypal subscription agreement.
     *
     * @param string $agreementId
     * @return string
     * @throws GatewayException
     */
    public function executeAgreement($agreementId)
    {
        $response = $this->gateway->completeSubscription([
            'transactionReference' => $agreementId
        ])->send();

        if ( ! $response->isSuccessful()) {
            throw new GatewayException('Could not execute subscription agreement on paypal');
        }

        return $response->getTransactionReference();
    }

    /**
     * Immediately cancel subscription agreement on paypal.
     *
     * @param Subscription $subscription
     * @return bool
     * @throws GatewayException
     */
    public function cancel(Subscription $subscription)
    {
        $response = $this->gateway->cancelSubscription([
            'transactionReference' => $subscription->gateway_id,
            'description' => 'Cancelled by user.'
        ])->send();

        if ( ! $response->isSuccessful()) {
            throw new GatewayException('Could not cancel paypal subscription.');
        }

        return true;
    }
}