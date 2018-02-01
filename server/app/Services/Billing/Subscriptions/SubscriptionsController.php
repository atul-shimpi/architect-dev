<?php namespace App\Services\Billing\Subscriptions;

use App\BillingPlan;
use App\Subscription;
use Illuminate\Http\Request;
use Vebto\Bootstrap\Controller;
use Vebto\Database\Paginator;

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
     * SubscriptionsController constructor.
     *
     * @param Request $request
     * @param BillingPlan $billingPlan
     * @param Subscription $subscription
     */
    public function __construct(
        Request $request,
        BillingPlan $billingPlan,
        Subscription $subscription
    )
    {
        $this->request = $request;
        $this->billingPlan = $billingPlan;
        $this->subscription = $subscription;

        $this->middleware('auth');
    }

    /**
     * Paginate all existing subscriptions.
     *
     * @throws \Illuminate\Auth\Access\AuthorizationException
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function index()
    {
        $this->authorize('index', Subscription::class);

        return (new Paginator($this->subscription))->with('user')->paginate($this->request->all());
    }

    /**
     * Change plan of specified subscription.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
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