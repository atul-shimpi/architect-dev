<?php namespace App\Services\Billing\Gateways\Stripe;

use Carbon\Carbon;
use App\BillingPlan;
use Vebto\Auth\User;
use App\Subscription;
use Omnipay\Stripe\Gateway;
use App\Services\Billing\GatewayException;
use App\Services\Billing\Gateways\Contracts\GatewaySubscriptionsInterface;

class StripeSubscriptions implements GatewaySubscriptionsInterface
{
    /**
     * @var Gateway
     */
    private $gateway;

    /**
     * StripeSubscriptions constructor.
     *
     * @param Gateway $gateway
     */
    public function __construct(Gateway $gateway)
    {
        $this->gateway = $gateway;
    }

    /**
     * Create a new subscription on stripe using specified plan.
     *
     * @param BillingPlan $plan
     * @param User $user
     * @param null $startDate
     * @return array
     * @throws GatewayException
     */
    public function create(BillingPlan $plan, User $user, $startDate = null)
    {
        if ($user->subscribedTo($plan, 'stripe')) {
            throw new \LogicException("User already subscribed to '{$plan->name}' plan.");
        }

        $request = $this->gateway->createSubscription([
            'customerReference' => $user->stripe_id,
            'plan' => $plan->uuid,
        ]);

        $data = $request->getData();
        $data['trial_end'] = $startDate ? Carbon::parse($startDate)->getTimestamp() : 'now';
        $response = $request->sendData($data);

        if ( ! $response->isSuccessful()) {
            throw new GatewayException('Could not create stripe subscription.');
        }

        return [
            'reference' => $response->getSubscriptionReference(),
            'end_date' => $response->getData()['current_period_end']
        ];
    }

    /**
     * Cancel specified subscription on stripe.
     *
     * @param Subscription $subscription
     * @param bool $atPeriodEnd
     * @return bool
     * @throws GatewayException
     */
    public function cancel(Subscription $subscription, $atPeriodEnd = true)
    {
        $response = $this->gateway->cancelSubscription([
            'subscriptionReference' => $subscription->gateway_id,
            'customerReference' => $subscription->user->stripe_id,
            'at_period_end' => $atPeriodEnd,
        ])->send();

        if ( ! $response->isSuccessful()) {
            throw new GatewayException('Could not cancel stripe subscription.');
        }

        return true;
    }

    /**
     * Resume specified subscription on stripe.
     *
     * @param Subscription $subscription
     * @param array $params
     * @return bool
     * @throws GatewayException
     */
    public function resume(Subscription $subscription, $params)
    {
        $response = $this->gateway->updateSubscription(array_merge([
            'plan' => $subscription->plan->uuid,
            'customerReference' => $subscription->user->stripe_id,
            'subscriptionReference' => $subscription->gateway_id,
        ], $params))->send();

        if ( ! $response->isSuccessful()) {
            throw new GatewayException('Could not update stripe subscription.');
        }

        return true;
    }
}