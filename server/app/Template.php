<?php namespace App;

use Illuminate\Database\Eloquent\Model as Eloquent;

/**
 * App\Template
 *
 * @property int $id
 * @property string $name
 * @property string|null $html
 * @property string|null $css
 * @property string|null $theme
 * @property int|null $user_id
 * @property string $thumbnail
 * @property string|null $color
 * @property string|null $category
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\BuilderPage[] $pages
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Template whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Template whereColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Template whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Template whereCss($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Template whereHtml($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Template whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Template whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Template whereTheme($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Template whereThumbnail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Template whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Template whereUserId($value)
 * @mixin \Eloquent
 */
class Template extends Eloquent {

	protected $guarded = ['id'];

	public function pages()
    {
        return $this->morphMany(BuilderPage::class, 'pageable');
    }
}