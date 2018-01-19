<?php namespace App\Services\Billing;

use App\BillingData;
use App\BillingPlan;
use Carbon\Carbon;

trait Billable
{
    public function subscribe(BillingPlan $plan)
    {
        //TODO: calc based on plan interval
        $endsAt = Carbon::now()->addDays(30);

        $subscription = $this->subscriptions()->create([
            'plan_id' => $plan->id,
            'ends_at' => $endsAt,
        ]);
    }

    /**
     * User billing data.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function billing()
    {
        return $this->hasOne(BillingData::class);
    }
}
