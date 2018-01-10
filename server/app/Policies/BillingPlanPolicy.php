<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class BillingPlanPolicy
{
    use HandlesAuthorization;

    public function index(User $user)
    {
        return $user->hasPermission('billing-plans.view');
    }

    public function show(User $user)
    {
        return $user->hasPermission('billing-plans.view');
    }

    public function store(User $user)
    {
        return $user->hasPermission('billing-plans.create');
    }

    public function update(User $user)
    {
        return $user->hasPermission('billing-plans.update');
    }

    public function destroy(User $user)
    {
        return $user->hasPermission('billing-plans.delete');
    }
}
