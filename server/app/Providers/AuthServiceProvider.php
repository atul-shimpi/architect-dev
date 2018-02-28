<?php

namespace App\Providers;

use Vebto\Billing\BillingPlan;
use App\BuilderPage;
use App\Policies\BillingPlanPolicy;
use App\Policies\BuilderPagePolicy;
use App\Policies\ProjectPolicy;
use App\Policies\SubscriptionPolicy;
use App\Project;
use Vebto\Billing\Subscription;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
        BuilderPage::class => BuilderPagePolicy::class,
        Project::class => ProjectPolicy::class,
        'Template' => 'App\Policies\TemplatePolicy',
        BillingPlan::class => BillingPlanPolicy::class,
        Subscription::class => SubscriptionPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
    }
}
