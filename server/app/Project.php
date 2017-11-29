<?php namespace App;

use Illuminate\Database\Eloquent\Model as Eloquent;

class Project extends Eloquent {

	protected $guarded = ['id'];

	public function pages()
    {
        return $this->morphMany(Page::class, 'pageable');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'users_projects', 'project_id', 'user_id');
    }
}