<?php namespace App\Http\Controllers;

use App\BuilderPage;
use App\Project;
use App\Services\ProjectRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;
use Vebto\Bootstrap\Controller;
use Illuminate\Database\Eloquent\Builder;

class ProjectsController extends Controller {

	/**
	 * Request instance.
	 * 
	 * @var Request
	 */
	private $request;

    /**
     * @var Project
     */
    private $project;

    /**
     * @var ProjectRepository
     */
    private $repository;

    /**
     * Create new ProjectsController instance.
     *
     * @param Request $request
     * @param Project $project
     * @param ProjectRepository $repository
     */
	public function __construct(Request $request, Project $project, ProjectRepository $repository)
	{
		$this->request = $request;
        $this->project = $project;
        $this->repository = $repository;
    }

    /**
     * Get all projects or projects belonging to specified user.
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
	public function index()
    {
        $this->authorize('index', [Project::class, $this->request->get('user_id')]);

        $query = $this->project->with('pages');

        if ($this->request->has('user_id')) {
            $query->whereHas('users', function(Builder $q) {
                return $q->where('users.id', $this->request->get('user_id'));
            });
        }

        return $query->orderBy('updated_at', 'desc')->get();
    }

    /**
     * Find a project by id.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function show($id)
    {
        $project = $this->project->with('pages', 'users')->findOrFail($id);

        $this->authorize('show', $project);

        $project = $this->repository->load($project);

        return $this->success(['project' => $project]);
    }

    /**
     * Update an existing project.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function update($id)
    {
        $project = $this->project->with('users', 'pages')->find($id);

        $this->authorize('update', $project);

        $this->validate($this->request, [
            'name' => 'string|min:1|max:255',
            'pages' => 'required|array',
            'pages.*' => 'required|array',
        ]);

        $project->pages()->delete();

        collect($this->request->get('pages'))->each(function($page) use($project) {
            $project->pages()->create(array_except($page, ['id', 'updated_at', 'libraries']));
        });

        return $this->success(['project' => $project]);
    }

    /**
     * Create a new project.
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
	public function store()
	{
        $this->authorize('store', Project::class);

        $this->validate($this->request, [
            'name' => 'required|string|min:1|max:255',
            'templateId' => 'integer|min:1|max:255|exists:templates,id',
        ]);

        $project = $this->repository->create($this->request->all());

        return $this->success(['project' => $project]);
	}
}