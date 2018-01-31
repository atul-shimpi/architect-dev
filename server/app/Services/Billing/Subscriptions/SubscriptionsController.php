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

    public function changePlan($id)
    {
        $this->validate($this->request, [
            'newPlanId' => 'required|integer|exists:billing_plans,id'
        ]);

        /** @var Subscription $subscription */
        $subscription = $this->subscription->findOrFail($id);
        $plan = $this->billingPlan->findOrfail($this->request->get('newPlanId'));

        $subscription->changePlan($plan);

        return $this->success(['user' => $subscription->user()->first()]);
    }

    /**
     * Cancel specified subscription.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function cancel($id)
    {
        $this->validate($this->request, [
            'delete' => 'boolean'
        ]);

        /** @var Subscription $subscription */
        $subscription = $this->subscription->findOrFail($id);

        if ($this->request->get('delete')) {
            $subscription->cancelAndDelete();
        } else {
            $subscription->cancel();
        }

        return $this->success(['user' => $subscription->user()->first()]);
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