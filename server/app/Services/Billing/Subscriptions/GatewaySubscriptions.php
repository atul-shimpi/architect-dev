<?php namespace App\Services\Billing\Subscriptions;

use App\BillingPlan;
use App\User;
use Omnipay\Omnipay;
use Omnipay\Stripe\Gateway;

class GatewaySubscriptions
{

    /**
     * @var Gateway
     */
    private $gateway;

    public function __construct()
    {
        $this->gateway = Omnipay::create('Stripe');

        $this->gateway->initialize(array(
            'apiKey' => 'sk_test_XkSUco6kDbp7cObW1fCDtALE',
        ));
    }

    /**
     * Create a new subscription on currently active gateway.
     *
     * @param BillingPlan $plan
     * @param User $user
     * @return bool
     */
    public function create(BillingPlan $plan, User $user)
    {
        $stripeId = $this->getStripeCustomerId($user);

        $response = $this->gateway->createSubscription([
            'customerReference' => $stripeId,
            'plan' => $plan->uuid,
        ])->send();

        http_response_code(500);
        dd($response->getMessage());

    }

    public function getStripeCustomerId(User $user)
    {
        if ($user->billing && $user->billing->stripe_id) {
            return $user->billing->stripe_id;
        }

        $response = $this->gateway->createCustomer([
            'email' => $user->email,
        ])->send();


        if ($response->isSuccessful()) {
            $stripeId = $response->getCustomerReference();
            $user->billing()->create(['stripe_id' => $stripeId]);

            return $stripeId;
        }

        //TODO: throw exception if could not create stripe user
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