<?php namespace App;

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
 * @property string $uuid
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
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
}
