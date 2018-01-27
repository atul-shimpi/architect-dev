<?php namespace App\Services\Billing\Subscriptions;

use App\BillingPlan;
use App\Services\Billing\Gateways\Paypal\PaypalGateway;
use App\Services\Billing\Gateways\Stripe\StripeGateway;
use App\Subscription;
use App\User;
use Illuminate\Http\Request;
use Omnipay\Common\Exception\InvalidCreditCardException;
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
     * @var PaypalGateway
     */
    private $paypal;

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
     * @param PaypalGateway $paypal
     * @param StripeGateway $stripe
     */
    public function __construct(
        Request $request,
        BillingPlan $billingPlan,
        Subscription $subscription,
        PaypalGateway $paypal,
        StripeGateway $stripe
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
            'card.security_code' => 'required|integer|min:1|max:999',
        ]);

        /** @var User $user */
        $user = $this->request->user();
        $plan = $this->billingPlan->findOrFail($this->request->get('plan_id'));

        $sub = $this->stripe->subscriptions()->create($plan, $user, $this->request->get('card'));
        $user->subscribe('stripe', $sub['reference'], $plan, $sub['end_date']);

        return $this->success();
    }

    public function addCardOnStripe()
    {
        $this->validate($this->request, [
            'card' => 'required|array|min:4',
            'card.number' => 'required|string|min:4',
            'card.expiration_month' => 'required|integer|min:1|max:12',
            'card.expiration_year' => 'required|integer|min:2018|max:2060',
            'card.security_code' => 'required|integer|min:1|max:999',
        ]);

        try {
            $user = $this->stripe->addCard($this->request->user(), $this->request->get('card'));
        } catch (InvalidCreditCardException $e) {
            return $this->error(['general' => $e->getMessage()]);
        }

        return $this->success(['user' => $user]);
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
        $urls = $this->paypal->subscriptions()->createAgreement($plan);

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

        $subscriptionId = $this->paypal->subscriptions()->executeAgreement(
            $this->request->get('agreement_id')
        );

        $plan = $this->billingPlan->findOrFail($this->request->get('plan_id'));
        $this->request->user()->subscribe('paypal', $subscriptionId, $plan);

        return $this->success();
    }

    /**
     * Cancel specified subscription.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function cancel($id)
    {
        /** @var Subscription $subscription */
        $subscription = $this->subscription->findOrFail($id);
        $subscription->cancel();

        return $this->success(['user' => $subscription->user()->get()]);
    }

    /**
     * Resume specified subscription.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function resume($id)
    {
        /** @var Subscription $subscription */
        $subscription = $this->subscription->findOrFail($id);
        $subscription->resume();

        return $this->success(['subscription' => $subscription]);
    }
}