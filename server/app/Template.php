<?php namespace App;

use Illuminate\Database\Eloquent\Model as Eloquent;

class Template extends Eloquent {

	protected $fillable = ['name'];

	public function pages()
    {
        return $this->morphMany('App\Page', 'pageable');
    }
}