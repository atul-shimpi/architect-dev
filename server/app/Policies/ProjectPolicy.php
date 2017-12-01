<?php

namespace App\Policies;

use App\Project;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProjectPolicy
{
    use HandlesAuthorization;

    public function index(User $user, $userId)
    {
        return $user->id === (int) $userId || $user->hasPermission('projects.view');
    }

    public function show(User $user, Project $project)
    {
        return $project->users->contains($user) || $user->hasPermission('projects.view');
    }

    public function store(User $user, Project $project)
    {
        return $project->users->contains($user) || $user->hasPermission('projects.create');
    }

    public function update(User $user, Project $project)
    {
        return $project->users->contains($user) || $user->hasPermission('projects.update');
    }

    public function destroy(User $user, Project $project)
    {
        return $project->users->contains($user) || $user->hasPermission('projects.delete');
    }
}
