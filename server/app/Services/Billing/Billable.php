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
        $renewsAt = Carbon::now()->addMonths(1 * $plan->interval_count);

        return $this->subscriptions()->create([
            'plan_id' => $plan->id,
            'ends_at' => null,
            'renews_at' => $renewsAt,
            'gateway' => $gateway,
            'gateway_id' => $gatewayId,
        ]);
    }

    /**
     * Determine if user is subscribed.
     *
     * @return bool
     */
    public function subscribed()
    {
        $subscription = $this->subscriptions->first(function(Subscription $sub) {
            return $sub->valid();
        });

        return ! is_null($subscription);
    }

    /**
     * Check if user is subscribed to specified plan and gateway.
     *
     * @param BillingPlan $plan
     * @param string $gateway
     * @return bool
     */
    public function subscribedTo(BillingPlan $plan, $gateway) {
        return ! is_null($this->subscriptions->first(function(Subscription $sub) use($plan, $gateway) {
            return $sub->valid && $sub->plan_id === $plan->id && $sub->gateway === $gateway;
        }));
    }

    /**
     * @return HasMany
     */
    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }
}
