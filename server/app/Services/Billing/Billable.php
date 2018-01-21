<?php namespace App\Services\Billing;

use App\BillingData;
use App\BillingPlan;
use App\Subscription;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

trait Billable
{
    public function subscribe($gateway, $gatewayId, BillingPlan $plan)
    {
        //TODO: calc based on plan interval
        $endsAt = Carbon::now()->addDays(30);

        $subscription = $this->subscriptions()->create([
            'plan_id' => $plan->id,
            'ends_at' => $endsAt,
            'gateway' => $gateway,
            'gateway_id' => $gatewayId,
        ]);
    }

    public function getIsSubscribedAttribute() {
        return $this->subscribed();
    }

    /**
     * Determine if user is subscribed.
     *
     * @return bool
     */
    public function subscribed()
    {
        $subscription = $this->subscription();

        if (is_null($subscription)) {
            return false;
        }

        return $subscription->valid();
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

    /**
     * Get user subscription.
     *
     * @return Subscription
     */
    public function subscription()
    {
        return $this->subscriptions()->first();
    }

    /**
     * @return HasMany
     */
    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }
}
