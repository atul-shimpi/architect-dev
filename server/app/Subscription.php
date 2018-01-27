<?php namespace App;

use App\Services\Billing\Gateways\GatewayFactory;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use LogicException;

/**
 * Class Subscription
 *
 * @property \Carbon\Carbon|null $trial_ends_at
 * @property \Carbon\Carbon|null $ends_at
 */
class Subscription extends Model
{
    protected $guarded = ['id'];

    protected $appends = ['on_grace_period', 'on_trial', 'valid', 'active', 'cancelled'];

    public function getOnGracePeriodAttribute() {
        return $this->onGracePeriod();
    }

    public function getOnTrialAttribute() {
        return $this->onTrial();
    }

    public function getValidAttribute() {
        return $this->valid();
    }

    public function getActiveAttribute() {
        return $this->active();
    }

    public function getCancelledAttribute() {
        return $this->cancelled();
    }

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        'trial_ends_at', 'ends_at', 'renews_at',
        'created_at', 'updated_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function plan()
    {
        return $this->belongsTo(BillingPlan::class);
    }

    /**
     * Determine if the subscription is within its trial period.
     *
     * @return bool
     */
    public function onTrial()
    {
        if (! is_null($this->trial_ends_at)) {
            return Carbon::now()->lt($this->trial_ends_at);
        } else {
            return false;
        }
    }

    /**
     * Determine if the subscription is active, on trial, or within its grace period.
     *
     * @return bool
     */
    public function valid()
    {
        return $this->active() || $this->onTrial() || $this->onGracePeriod();
    }

    /**
     * Determine if the subscription is active.
     *
     * @return bool
     */
    public function active()
    {
        return is_null($this->ends_at) || $this->onGracePeriod();
    }

    /**
     * Determine if the subscription is no longer active.
     *
     * @return bool
     */
    public function cancelled()
    {
        return ! is_null($this->ends_at);
    }

    /**
     * Determine if the subscription is within its grace period after cancellation.
     *
     * @return bool
     */
    public function onGracePeriod()
    {
        if ( ! is_null($endsAt = $this->ends_at)) {
            return Carbon::now()->lt(Carbon::instance($endsAt));
        } else {
            return false;
        }
    }

    /**
     * Cancel the subscription at the end of the billing period.
     *
     * @return $this
     */
    public function cancel()
    {
        $endDate = $this->gateway()->subscriptions()->cancel($this);

        // If the user was on trial, we will set the grace period to end when the trial
        // would have ended. Otherwise, we'll retrieve the end of the billing period
        // and make that the end of the grace period for this current user.
        if ($this->onTrial()) {
            $this->ends_at = $this->trial_ends_at;
        } else {
            $this->ends_at = Carbon::createFromTimestamp($endDate);
        }

        $this->save();

        return $this;
    }

    /**
     * Resume the cancelled subscription.
     *
     * @return $this
     *
     * @throws \LogicException
     */
    public function resume()
    {
        if ( ! $this->onGracePeriod()) {
            throw new LogicException('Unable to resume subscription that is not within grace period.');
        }

        if ($this->onTrial()) {
            $trialEnd = $this->trial_ends_at->getTimestamp();
        } else {
            $trialEnd = 'now';
        }

        $subscription = $this->gateway();

        // To resume the subscription we need to set the plan parameter on the Stripe
        // subscription object. This will force Stripe to resume this subscription
        // where we left off. Then, we'll set the proper trial ending timestamp.
        $subscription->update($this, ['trial_end' => $trialEnd]);


        // Finally, we will remove the ending timestamp from the user's record in the
        // local database to indicate that the subscription is active again and is
        // no longer "cancelled". Then we will save this record in the database.
        $this->fill(['ends_at' => null])->save();

        return $this;
    }

    /**
     * Get gateway this subscriptions was created with.
     * @return mixed
     *
     */
    public function gateway()
    {
        return \App::make(GatewayFactory::class)->getSubscriptionGateway($this->gateway);
    }
}
