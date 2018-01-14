<?php namespace App\Services\Billing\Subscriptions;

use App\BillingPlan;
use App\Subscription;
use Carbon\Carbon;
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
     * @var GatewaySubscriptions
     */
    private $gatewaySubscriptions;

    /**
     * SubscriptionsController constructor.
     *
     * @param Request $request
     * @param BillingPlan $billingPlan
     * @param Subscription $subscription
     */
    public function __construct(Request $request, BillingPlan $billingPlan, Subscription $subscription, GatewaySubscriptions $gatewaySubscriptions)
    {
        $this->request = $request;

        $this->middleware('auth');
        $this->billingPlan = $billingPlan;
        $this->subscription = $subscription;
        $this->gatewaySubscriptions = $gatewaySubscriptions;
    }

    public function store()
    {
        $this->validate($this->request, [
            'plan_id' => 'required|integer|exists:billing_plans,id',
            'card' => 'required|array|min:4',
            'card.number' => 'required|string|min:4',
            'card.expiration_month' => 'required|integer|min:1|max:12',
            'card.expiration_year' => 'required|integer|min:2018|max:2060',
            'card.cvc' => 'required|integer|min:1|max:999',
        ]);

        $user = $this->request->user();
        $plan = $this->billingPlan->findOrFail($this->request->get('plan_id'));

        //TODO: calc based on plan interval
        $endsAt = Carbon::now()->addDays(30);

        $this->gatewaySubscriptions->create($plan, $user, $this->request->get('card'));

        $subscription = $user->subscriptions()->create([
            'plan_id' => $plan->id,
            'ends_at' => $endsAt,
        ]);
    }
}