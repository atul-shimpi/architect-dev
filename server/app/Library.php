<?php namespace App;

use Illuminate\Database\Eloquent\Model as Eloquent;

class Library extends Eloquent {

	protected $fillable = ['name', 'path', 'type', 'user_id'];

	public function pages()
    {
        return $this->belongsToMany('App\Page', 'pages_libraries', 'library_id', 'page_id');
    }

}