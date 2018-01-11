<?php namespace App;

use Illuminate\Database\Eloquent\Model as Eloquent;

/**
 * App\Theme
 *
 * @property int $id
 * @property string $name
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @mixin \Eloquent
 * @property string $path
 * @property string|null $custom_less
 * @property string|null $modified_vars
 * @property string $type
 * @property string|null $source
 * @property int|null $user_id
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Theme whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Theme whereCustomLess($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Theme whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Theme whereModifiedVars($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Theme whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Theme wherePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Theme whereSource($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Theme whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Theme whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Theme whereUserId($value)
 */
class Theme extends Eloquent {
	protected $guarded = ['id'];
}