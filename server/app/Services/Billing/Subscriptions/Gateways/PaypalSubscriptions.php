<?php namespace App\Services\Billing\Subscriptions\Gateways;

use App\BillingPlan;
use App\Services\Billing\GatewayException;
use App\Services\Billing\Plans\Gateways\PaypalPlans;
use App\User;
use Carbon\Carbon;
use Omnipay\Omnipay;
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
     *
     * @param PaypalPlans $paypalPlans
     */
    public function __construct(PaypalPlans $paypalPlans)
    {
        $this->paypalPlans = $paypalPlans;
        $this->gateway = Omnipay::create('PayPal_Rest');

        $this->gateway->initialize(array(
            'clientId' => config('services.paypal.client_id'),
            'secret' => config('services.paypal.secret'),
            'testMode' => true,
        ));
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
}