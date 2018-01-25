<?php namespace App\Services\Billing;

use App\BillingData;
use App\BillingPlan;
use App\Subscription;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

trait Billable
{
    public function subscribe($gateway, $gatewayId, BillingPlan $plan, $renewsAt = null)
    {
        //TODO: calc based on plan interval
        if ($renewsAt) {
            $renewsAt = Carbon::createFromTimestamp($renewsAt);
        } else {
            $renewsAt = Carbon::now()->addDays(30);
        }

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
        $subscription = $this->subscriptions->first();

        if (is_null($subscription)) {
            return false;
        }

        return $subscription->valid();
    }

    /**
     * @return HasMany
     */
    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }
}
