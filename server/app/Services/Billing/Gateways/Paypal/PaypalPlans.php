<?php namespace App\Services\Billing\Gateways\Paypal;

use App\BillingPlan;
use App\Services\Billing\GatewayException;
use App\Services\Billing\Plans\Gateways\GatewayPlans;
use Omnipay\PayPal\RestGateway;

class PaypalPlans implements GatewayPlans
{
    /**
     * @var RestGateway
     */
    private $gateway;

    /**
     * PaypalPlans constructor.
     *
     * @param RestGateway $gateway
     */
    public function __construct(RestGateway $gateway)
    {
        $this->gateway = $gateway;
    }

    /**
     * Find specified plan on paypal.
     *
     * @param BillingPlan $plan
     * @return array|null
     */
    public function find(BillingPlan $plan)
    {
        $response = $this->gateway->listPlan(['page_size' => 20, 'status' => RestGateway::BILLING_PLAN_STATE_ACTIVE])->send();

        if ( ! isset($response->getData()['plans'])) return null;

        $paypalPlan = collect($response->getData()['plans'])->first(function ($paypalPlan) use ($plan) {
            return $paypalPlan['description'] === $plan->uuid;
        });

        return $paypalPlan ?: null;
    }

    /**
     * Get specified plan's PayPal ID.
     *
     * @param BillingPlan $plan
     * @return string
     * @throws GatewayException
     */
    public function getPlanId(BillingPlan $plan)
    {
        if ( ! $paypalPlan = $this->find($plan)) {
            throw new GatewayException("Could not find plan '{$plan->name}' on paypal");
        }

        return $paypalPlan['id'];
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
        return $this->gateway->updatePlan([
            'transactionReference' => $this->getPlanId($plan),
            'state' => RestGateway::BILLING_PLAN_STATE_DELETED
        ])->send()->isSuccessful();
    }
}