<?php

namespace App\Console\Commands;

use App\Project;
use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Collection;

class MigrateLegacyProjects extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'legacy:projects';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migrate legacy projects to new version.';

    /**
     * @var Project
     */
    private $project;

    /**
     * Create a new command instance.
     *
     * @param Project $project
     */
    public function __construct(Project $project)
    {
        parent::__construct();

        $this->project = $project;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->project->orderBy('id')->chunk(100, function(Collection $projects) {
            $projects->each(function(Project $project) {
                if ($project->uuid) return;

                //add uuid to legacy projects
                $project->fill(['uuid' => str_random(36)])->save();
            });
        });

        $this->info('Migrated legacy projects.');
    }
}
