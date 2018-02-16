<?php namespace App;

use Illuminate\Database\Eloquent\Relations\HasOne;
use Vebto\Auth\FormatsPermissions;
use Illuminate\Database\Eloquent\Model;

/**
 * App\BillingPlan
 *
 * @property int $id
 * @property string $name
 * @property int $amount
 * @property string $currency
 * @property string $interval
 * @property string $interval_count
 * @property integer $parent_id
 * @property string $uuid
 * @property string $features
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read BillingPlan $parent
 * @method static \Illuminate\Database\Eloquent\Builder|\App\BillingPlan whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\BillingPlan whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\BillingPlan whereCurrency($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\BillingPlan whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\BillingPlan whereInterval($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\BillingPlan whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\BillingPlan whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\BillingPlan whereUuid($value)
 * @mixin \Eloquent
 */
class BillingPlan extends Model
{
    use FormatsPermissions;

    protected $guarded = ['id'];

    protected $casts = [
        'amount' => 'integer',
        'interval_count' => 'integer',
        'recommended' => 'boolean',
        'free' => 'boolean',
        'show_permissions' => 'boolean',
        'position' => 'integer'
    ];

    public function getFeaturesAttribute($value)
    {
        if ($this->parent_id) {
            return $this->parent->features;
        }

        return json_decode($value, true) ?: [];
    }

    public function getPermissionsAttribute($value)
    {
        if ($this->parent_id) {
            return $this->parent->getPermissionsAttribute($value);
        }

        return json_decode($value, true) ?: [];
    }

    public function setFeaturesAttribute($value)
    {
        if (is_string($value)) return;
        $this->attributes['features'] = json_encode($value);
    }

    public function parent()
    {
        return $this->belongsTo(BillingPlan::class, 'parent_id');
    }
}
