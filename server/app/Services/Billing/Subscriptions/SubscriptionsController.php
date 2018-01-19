<?php namespace App\Services\Billing\Subscriptions;

use App\BillingPlan;
use App\Services\Billing\Subscriptions\Gateways\PaypalSubscriptions;
use App\Services\Billing\Subscriptions\Gateways\StripeSubscriptions;
use App\Subscription;
use App\User;
use Illuminate\Http\Request;
use Vebto\Bootstrap\Controller;

class SubscriptionsController extends Controller
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
     * @var PaypalSubscriptions
     */
    private $paypal;

    /**
     * @var StripeSubscriptions
     */
    private $stripe;

    /**
     * SubscriptionsController constructor.
     *
     * @param Request $request
     * @param BillingPlan $billingPlan
     * @param Subscription $subscription
     * @param PaypalSubscriptions $paypal
     * @param StripeSubscriptions $stripe
     */
    public function __construct(
        Request $request,
        BillingPlan $billingPlan,
        Subscription $subscription,
        PaypalSubscriptions $paypal,
        StripeSubscriptions $stripe
    )
    {
        $this->paypal = $paypal;
        $this->stripe = $stripe;
        $this->request = $request;
        $this->billingPlan = $billingPlan;
        $this->subscription = $subscription;

        $this->middleware('auth');
    }

    public function createOnStripe()
    {
        $this->validate($this->request, [
            'plan_id' => 'required|integer|exists:billing_plans,id',
            'card' => 'required|array|min:4',
            'card.number' => 'required|string|min:4',
            'card.expiration_month' => 'required|integer|min:1|max:12',
            'card.expiration_year' => 'required|integer|min:2018|max:2060',
            'card.cvc' => 'required|integer|min:1|max:999',
        ]);

        /** @var User $user */
        $user = $this->request->user();
        $plan = $this->billingPlan->findOrFail($this->request->get('plan_id'));

        $this->stripe->create($plan, $user, $this->request->get('card'));
        $user->subscribe($plan);

        return $this->success();
    }

    /**
     * Create subscription agreement on paypal.
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Services\Billing\GatewayException
     */
    public function createPaypalAgreement()
    {
        $this->validate($this->request, [
            'plan_id' => 'required|integer|exists:billing_plans,id'
        ]);

        $plan = $this->billingPlan->findOrFail($this->request->get('plan_id'));
        $urls = $this->paypal->createAgreement($plan);

        return $this->success(['urls' => $urls]);
    }

    /**
     * Execute subscription agreement on paypal.
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Services\Billing\GatewayException
     */
    public function executePaypalAgreement()
    {
        $this->validate($this->request, [
            'agreement_id' => 'required|string|min:1',
            'plan_id' => 'required|integer|exists:billing_plans,id',
        ]);

        $this->paypal->executeAgreement(
            $this->request->user(),
            $this->request->get('agreement_id')
        );

        $plan = $this->billingPlan->findOrFail($this->request->get('plan_id'));
        $this->request->user()->subscribe($plan);

        return $this->success();
    }
}