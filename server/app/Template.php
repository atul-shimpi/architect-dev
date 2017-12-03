<?php namespace App;

use Illuminate\Database\Eloquent\Model as Eloquent;

class Template extends Eloquent {

	protected $guarded = ['id'];

	public function pages()
    {
        return $this->morphMany(BuilderPage::class, 'pageable');
    }
}