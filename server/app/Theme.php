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
 */
class Theme extends Eloquent {
	protected $guarded = ['id'];
}