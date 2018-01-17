<?php namespace App\Services\Billing\Plans\Gateways;

use App\BillingPlan;
use App\Services\Billing\GatewayException;
use Omnipay\Omnipay;
use Omnipay\PayPal\RestGateway;

class PaypalPlans implements GatewayPlansInterface
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
     * Create a new subscription plan on paypal.
     *
     * @param BillingPlan $plan
     * @throws GatewayException
     * @return bool
     */
    public function create(BillingPlan $plan)
    {
        $response = $this->gateway->createPlan([
            'name'  => $plan->name,
            'description'  => $plan->uuid,
            'type' => RestGateway::BILLING_PLAN_TYPE_INFINITE,
            'paymentDefinitions' => [
                [
                    'name'               => $plan->name.' definition',
                    'type'               => RestGateway::PAYMENT_REGULAR,
                    'frequency'          => RestGateway::BILLING_PLAN_FREQUENCY_MONTH,
                    'frequency_interval' => 1,
                    'cycles'             => 0,
                    'amount'             => ['value' => $plan->amount, 'currency' => strtoupper($plan->currency)],
                ],
            ],
            'merchant_preferences' => [
                'return_url' => url('billing/paypal/callback/approved'),
                'cancel_url' => url('billing/paypal/callback/canceled'),
                'auto_bill_amount' => 'YES',
                'initial_fail_amount_action' => 'CONTINUE',
                'max_fail_attempts' => '3',
            ]
        ])->send();

        if ( ! $response->isSuccessful()) {
            throw new GatewayException('Could not create subscription plan on paypal');
        }

        //set plan to active on paypal
        $response = $this->gateway->updatePlan([
            'state' => RestGateway::BILLING_PLAN_STATE_ACTIVE,
            'transactionReference' => $response->getData()['id'],
        ])->send();

        if ( ! $response->isSuccessful()) {
            throw new GatewayException('Could not create subscription plan on paypal');
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