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
     * Create a new subscription on paypal.
     *
     * @throws GatewayException
     * @param BillingPlan $plan
     * @param User $user
     * @param array $cardData
     * @return bool
     */
    public function create(BillingPlan $plan, User $user, $cardData)
    {

        $response = $this->gateway->listPlan()->send();
        http_response_code(500);
        dd($response);

        $response = $this->gateway->createSubscription([
            'name'        => 'Test Subscription',
            'description' => 'A subscription created for testing',
            'planId' => $plan->uuid,
            'startDate' => Carbon::now()->addMinute(),
            'payerDetails' => ['payment_method' => 'paypal'],
        ])->send();

        if ( ! $response->isSuccessful()) {
            http_response_code(500);
            dd($response);
            throw new GatewayException('Could not create subscription on paypal');
        }

        if ($response->isRedirect()) {
            echo "Response is a redirect\n";
            echo "Redirect URL = " . $response->getRedirectUrl();
            $subscription_id = $response->getTransactionReference();
            die("Subscription reference = " . $subscription_id);
        }

        return true;
    }
}