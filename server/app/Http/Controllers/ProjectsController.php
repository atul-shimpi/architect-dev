<?php namespace App\Http\Controllers;

use App\BuilderPage;
use App\Project;
use Illuminate\Http\Request;
use Vebto\Bootstrap\Controller;
use Illuminate\Database\Eloquent\Builder;

class ProjectsController extends Controller {

	/**
	 * Exporter instance.
	 */
	private $exporter;

	/**
	 * Request instance.
	 * 
	 * @var Request
	 */
	private $request;

	/**
	 * ProjectCreator instance.
	 */
	private $creator;

    /**
     * @var Project
     */
    private $project;

    /**
     * Create new ProjectsController instance.
     *
     * @param Request $request
     * @param Project $project
     */
	public function __construct(Request $request, Project $project)
	{
		$this->request = $request;
        $this->project = $project;
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

        return $query->get();
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
        $project = $this->project->with('pages', 'users')->find($id);

        $this->authorize('show', $project);

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

        collect($this->request->get('pages'))->each(function($page) use($project) {
            $project->pages()->delete();
            $project->pages()->create(array_except($page, ['id', 'updated_at', 'libraries']));
        });

        return $this->success(['project' => $project]);
    }

	/**
	 * Render and display project assets as a site.
	 * 
	 * @param  int|string $id
	 * @return Response
	 */
	public function render($id, $name)
	{
        $project = $this->repo->find((int)$id);

		if ( ! $project || ! $project->published) {
			return $this->app['twig']->render('404.twig.html');
		}

		$path = $this->exporter->project((int) $id, false);

		if ( ! $path) {
            return $this->app['twig']->render('404.twig.html');
		}
		
		$base = str_replace($this->app['base_dir'], $this->app['base_url'], $path);

		return $this->app->redirect($base.$name.'.html');
	}

	/**
	 * Create a new project.
	 *
	 * @return Response
	 */
	public function store()
	{

		if ( ! $this->input->has('name')) {
			return new Response($this->app['translator']->trans('projectNameRequired'), 400);
		}

		if ($this->repo->find($this->input->get('name'))) {
			return new Response($this->app['translator']->trans('projectWithNameExists'), 400);
		}

		return new Response($this->creator->create($this->input->all()), 201);
	}

	/**
	 * Publish project with given id.
	 * 
	 * @param  string|int $id
	 * @return Response
	 */
	public function publish($id)
	{
		if ($project = $this->repo->find((int)$id)) {
			$project->published = 1;
			$project->save();
		}

		return new Response($this->app['translator']->trans('projectPublishSuccess'), 200);
	}

	/**
	 * Unpublish project with given id.
	 * 
	 * @param  string|int $id
	 * @return Response
	 */
	public function unpublish($id)
	{
		if ($project = $this->repo->find((int)$id)) {
			$project->published = 0;
			$project->save();
		}

		return new Response($this->app['translator']->trans('projectUnpublishSuccess'), 200);
	}

	/**
	 * Delete project with given id.
	 * 
	 * @param  int|string $id
	 * @return Response
	 */
	public function delete($id)
	{
		if ($this->app['is_demo'] && $this->app['sentry']->getUser()->email == 'demo@demo.com') {
			return new Response('You can\'t delete projects on demo account.', 403); 
		}

		if ( ! $this->app['sentry']->getUser()->hasAccess('projects.delete')) {
			return new Response($this->app['translator']->trans('noPermProjectDelete'), 403);
		}

		$project = $this->repo->find((int)$id);

		if ($project->public) {
			return new Response($this->app['translator']->trans('noPermissionsToDeleteProject'), 403);
		}

		if ($project && $project->pages()->delete() && $project->delete()) {
			return new Response($this->app['translator']->trans('projectDeleteSuccess'), 204);
		}
	}

	/**
	 * Delete a page with given id.
	 * 
	 * @param  string/int $id
	 * @return Response
	 */
	public function deletePage($id)
	{
		return new Response($this->repo->deletePage($id), 204);
	}

	public function deleteAllPages($id)
	{
		return new Response($this->repo->deleteAllPages($id), 200);
	}
}