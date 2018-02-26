<?php

namespace App\Console;

use App\Console\Commands\GenerateTsClasses;
use App\Console\Commands\Legacy\MigrateLegacyProjects;
use App\Console\Commands\Legacy\MigrateLegacyTemplates;
use App\Console\Commands\ResetDemoAdminAccount;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        GenerateTsClasses::class,
        MigrateLegacyProjects::class,
        MigrateLegacyTemplates::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        if (config('vebto.site.demo')) {
            $schedule->command(ResetDemoAdminAccount::class)->daily();
        }
    }

    /**
     * Register the Closure based commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        require base_path('routes/console.php');
    }
}
