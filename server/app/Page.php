<?php namespace App;

use Illuminate\Database\Eloquent\Model as Eloquent;

class Page extends Eloquent {

    protected $guarded = ['id'];

    public function libraries()
    {
        return $this->belongsToMany('App\Library', 'pages_libraries', 'page_id', 'library_id');
    }

   	public function pageable()
    {
        return $this->morphTo();
    }
}