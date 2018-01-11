<?php namespace App\Services\Billing\Plans;

use App\BillingPlan;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Vebto\Bootstrap\Controller;
use Vebto\Database\Paginator;

class BillingPlansController extends Controller
{
    /**
     * @var BillingPlan
     */
    private $plan;

    /**
     * @var Request
     */
    private $request;

    /**
     * @var GatewayPlans
     */
    private $gatewayPlans;

    /**
     * BillingPlansController constructor.
     *
     * @param BillingPlan $plan
     * @param Request $request
     * @param GatewayPlans $gatewayPlans
     */
    public function __construct(BillingPlan $plan, Request $request, GatewayPlans $gatewayPlans)
    {
        $this->plan = $plan;
        $this->request = $request;
        $this->gatewayPlans = $gatewayPlans;
    }

    /**
     * Display a listing of the resource.
     *
     * @throws \Illuminate\Auth\Access\AuthorizationException
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function index()
    {
        $this->authorize('index', BillingPlan::class);

        return (new Paginator($this->plan))->paginate($this->request->all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @throws \Illuminate\Auth\Access\AuthorizationException
     * @return BillingPlan|JsonResponse
     * @throws \Exception
     */
    public function store()
    {
        $this->authorize('store', BillingPlan::class);

        $this->validate($this->request, [
            'name' => 'required|string|max:250|unique:billing_plans',
            'currency' => 'required|string|max:255',
            'interval' => 'required|string|max:255',
            'amount' => 'required|integer|min:0',
        ]);

        $data = $this->request->all();
        $data['uuid'] = str_random(36);

        $plan = $this->plan->create($data);

        //delete plan from database if it could not be
        //created on currently active payment gateway
        if ( ! $this->gatewayPlans->create($plan)) {
            $plan->delete();
            return $this->error(['general' => 'Could not create plan on the gateway.']);
        }

        return $this->success(['plan' => $plan]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @throws \Exception
     * @throws \Illuminate\Auth\Access\AuthorizationException
     * @return \Illuminate\Http\Response
     */
    public function destroy()
    {
        $this->authorize('destroy', BillingPlan::class);

        $this->validate($this->request, [
            'ids' => 'required|array'
        ]);

        foreach ($this->request->get('ids') as $id) {
            $plan = $this->plan->find($id);

            if ($this->gatewayPlans->delete($plan)) {
                $plan->delete();
            }
        }

        return $this->success();
    }
}
