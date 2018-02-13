<?php

namespace App\Console\Commands\Legacy;

use App\BuilderPage;
use App\Project;
use App\Services\ProjectRepository;
use App\Services\TemplateLoader;
use App\Services\TemplateRepository;
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
     * @var ProjectRepository
     */
    private $repository;

    /**
     * @var BuilderPage
     */
    private $page;

    /**
     * @var TemplateLoader
     */
    private $templateLoader;

    /**
     * Create a new command instance.
     *
     * @param Project $project
     * @param BuilderPage $page
     * @param ProjectRepository $repository
     * @param TemplateLoader $templateLoader
     */
    public function __construct(Project $project, BuilderPage $page, ProjectRepository $repository, TemplateLoader $templateLoader)
    {
        parent::__construct();

        $this->page = $page;
        $this->project = $project;
        $this->repository = $repository;
        $this->templateLoader = $templateLoader;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //update model namespaces in database
        $this->page->where('pageable_type', 'Project')->update(['pageable_type' => Project::class]);
        $this->page->where('pageable_type', 'Template')->update(['pageable_type' => 'App\Template']);

        $this->project->with('pages', 'users')->orderBy('id')->chunk(100, function(Collection $projects)  {
            $projects->each(function(Project $project) {
                //if ($project->uuid) return;

                //add uuid to legacy projects
                $project->fill(['uuid' => str_random(36), 'framework' => 'temp', 'template' => 'temp'])->save();

                $templateNames = $this->templateLoader->loadAll()->pluck('name');

                $data = $project->toArray();
                $data['template'] = 'wonder';
                $data['framework'] = 'bootstrap-3';

                if ($project->pages->isNotEmpty()) {
                    $data['theme'] = $project->pages->first()->theme;

                    //try to extract template name from project page csss
                    $data['template'] = $templateNames->first(function($name) use($project) {
                        return str_contains($project->pages->first()->css, $name);
                    }, $data['template']);
                }

                $this->repository->update($project, $data);
            });
        });

        $this->info('Migrated legacy projects.');
    }
}
