<?php namespace App\Services\Billing\Subscriptions\Gateways;

use App\BillingPlan;
use App\Services\Billing\GatewayException;
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
     * PaypalPlans constructor.
     */
    public function __construct()
    {
        $this->gateway = Omnipay::create('PayPal_Rest');

        $this->gateway->initialize(array(
            'clientId' => 'Ad1xgUa63HvJMPt0UwFRd0JbegiwAf4k6luLAQiW-YwCdBOudl-tW4eJeqHa7yZD4qmrKF_NTZLTsku3',
            'secret' => 'EJPT6OnWxZ9Pl8tkW0o9KS_KwdW1JpwlsMR44zDIomjYcDiLU5uxcMAisqgZueJ-9ynSGC8mIeuDlNFe',
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
            'planId' => $this->getPaypalPlanId($plan),
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
     * @param User $user
     * @param string $agreementId
     * @return bool
     * @throws GatewayException
     */
    public function executeAgreement(User $user, $agreementId)
    {
        $response = $this->gateway->completeSubscription([
            'transactionReference' => $agreementId
        ])->send();

        if ( ! $response->isSuccessful()) {
            throw new GatewayException('Could not execute subscription agreement on paypal');
        }

        $user->billing()->firstOrNew(['user_id' => $user->id])->fill([
            'paypal_subscription_id' => $response->getTransactionReference()
        ])->save();

        return true;
    }

    /**
     * Get specified plan's PayPal ID.
     *
     * @param BillingPlan $plan
     * @return string
     */
    private function getPaypalPlanId(BillingPlan $plan)
    {
        $response = $this->gateway->listPlan(['page_size' => 20, 'status' => RestGateway::BILLING_PLAN_STATE_ACTIVE])->send();

        $paypalPlan = collect($response->getData()['plans'])->first(function ($paypalPlan) use ($plan) {
            return $paypalPlan['description'] === $plan->uuid;
        });

        return $paypalPlan['id'];
    }
}