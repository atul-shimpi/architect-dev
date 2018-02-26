<?php namespace App\Console\Commands;

use App\Project;
use App\Services\ProjectRepository;
use Hash;
use Artisan;
use App\User;
use Illuminate\Console\Command;
use Illuminate\Support\Collection;
use Vebto\Localizations\Localization;

class ResetDemoSite extends Command {

	/**
	 * The name and signature of the console command.
	 *
	 * @var string
	 */
	protected $signature = 'demo:reset';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Reset demo site.';

    /**
     * @var User
     */
    private $user;
    /**
     * @var Localization
     */
    private $localization;

    /**
     * @var ProjectRepository
     */
    private $projectRepository;

    /**
     * @var Project
     */
    private $project;

    /**
     * ResetDemoAdminAccount constructor.
     *
     * @param User $user
     * @param Localization $localization
     * @param ProjectRepository $projectRepository
     * @param Project $project
     */
    public function __construct(User $user, Localization $localization, ProjectRepository $projectRepository, Project $project)
	{
        parent::__construct();

	    $this->user = $user;
        $this->localization = $localization;
        $this->projectRepository = $projectRepository;
        $this->project = $project;
    }

    /**
     * Execute the console command.
     *
     * @throws \Exception
     * @return void
     */
	public function handle()
	{
        /** @var User $admin */
	    $admin = $this->user->where('email', 'admin@admin.com')->firstOrFail();

        $admin->avatar = null;
        $admin->username = null;
        $admin->password = Hash::make('admin');
        $admin->permissions = ['admin' => 1, 'superAdmin' => 1];
        $admin->save();

        //delete projects
        $this->project->orderBy('id')->chunk(50, function(Collection $projects)  {
            $projects->each(function(Project $project) {
                $this->projectRepository->delete($project);
            });
        });

        //create some demo projects


        //delete localizations
        $this->localization->get()->each(function(Localization $localization) {
            if (strtolower($localization->name) !== 'english') {
                $localization->delete();
            }
        });

        Artisan::call('cache:clear');

        $this->info('Demo site reset.');
	}
}
