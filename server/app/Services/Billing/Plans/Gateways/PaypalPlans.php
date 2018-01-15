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
        $request = $this->gateway->createPlan([
            'name'  => $plan->name,
            'description'  => $plan->name,
            'type' => RestGateway::BILLING_PLAN_TYPE_INFINITE,
            'state' => RestGateway::BILLING_PLAN_STATE_ACTIVE,
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
                'setup_fee' => [
                    'value' => '1',
                    'currency' => 'USD'
                ],
                'return_url' => 'http://google.com',
                'cancel_url' => 'http://google.com',
                'auto_bill_amount' => 'YES',
                'initial_fail_amount_action' => 'CONTINUE',
                'max_fail_attempts' => '5',
            ]
        ]);

        $data = $request->getData();
        $data['id'] = $plan->uuid;
        http_response_code(500);
        dd($data);
        $response = $request->sendData($data);

        http_response_code(500);
        dd($response);

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