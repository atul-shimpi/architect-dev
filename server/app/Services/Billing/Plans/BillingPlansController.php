<?php namespace App\Services\Billing\Plans;

use App\BillingPlan;
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
     * BillingPlansController constructor.
     *
     * @param BillingPlan $plan
     * @param Request $request
     */
    public function __construct(BillingPlan $plan, Request $request)
    {
        $this->plan = $plan;
        $this->request = $request;
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
     * @param  \Illuminate\Http\Request $request
     * @throws \Illuminate\Auth\Access\AuthorizationException
     * @return BillingPlan
     */
    public function store(Request $request)
    {
        $this->authorize('store', BillingPlan::class);

        $this->validate($this->request, [
            'name' => 'required|string|max:250|unique:billing_plans',
            'currency' => 'required|string|max:255',
            'interval' => 'required|string|max:255',
            'amount' => 'required|integer|min:0',
        ]);

        return $this->plan->create($this->request->all());
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
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
