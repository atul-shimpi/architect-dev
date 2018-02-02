<?php namespace App\Services\Billing\Gateways\Stripe;

use App\User;
use App\BillingPlan;
use App\Subscription;
use Illuminate\Http\Request;
use Vebto\Bootstrap\Controller;
use Omnipay\Common\Exception\InvalidCreditCardException;

class StripeController extends Controller
{
    /**
     * @var Request
     */
    private $request;

    /**
     * @var BillingPlan
     */
    private $billingPlan;

    /**
     * @var Subscription
     */
    private $subscription;

    /**
     * @var StripeGateway
     */
    private $stripe;

    /**
     * SubscriptionsController constructor.
     *
     * @param Request $request
     * @param BillingPlan $billingPlan
     * @param Subscription $subscription
     * @param StripeGateway $stripe
     */
    public function __construct(
        Request $request,
        BillingPlan $billingPlan,
        Subscription $subscription,
        StripeGateway $stripe
    )
    {
        $this->stripe = $stripe;
        $this->request = $request;
        $this->billingPlan = $billingPlan;
        $this->subscription = $subscription;

        $this->middleware('auth');
    }

    /**
     * Create a new subscription on stripe.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function createSubscription()
    {
        $this->validate($this->request, [
            'plan_id' => 'required|integer|exists:billing_plans,id',
            'start_date' => 'string'
        ]);

        /** @var User $user */
        $user = $this->request->user();
        $plan = $this->billingPlan->findOrFail($this->request->get('plan_id'));

        $sub = $this->stripe->subscriptions()->create($plan, $user, $this->request->get('start_date'));
        $user->subscribe('stripe', $sub['reference'], $plan);

        return $this->success(['user' => $user]);
    }

    /**
     * Add a new bank card to user on stripe.
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Services\Billing\GatewayException
     */
    public function addCard()
    {
        $this->validate($this->request, [
            'card' => 'required|array|min:4',
            'card.number' => 'required|string|min:4',
            'card.expiration_month' => 'required|integer|min:1|max:12',
            'card.expiration_year' => 'required|integer|min:2018|max:2060',
            'card.security_code' => 'required|integer|min:1',
        ]);

        try {
            $user = $this->stripe->addCard($this->request->user(), $this->request->get('card'));
        } catch (InvalidCreditCardException $e) {
            return $this->error(['general' => $e->getMessage()]);
        }

        return $this->success(['user' => $user]);
    }
}