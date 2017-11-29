<?php namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;
use Vebto\Bootstrap\Controller;

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

	public function index()
    {
        return $this->project->with('pages')->get();
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
	 * Update an existing project.
	 * 
	 * @param  sting/int $id
	 * @return Response
	 */
	public function update($id)
	{
	    $data = $this->request->all();



		return $this->success();
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

	public function saveImage($id)
	{	
		$this->app['imagesSaver']->saveFromString(
			$this->request->getContent(), 
			'assets/images/projects/project-'.$id.'.png', 
			false
		);

		return new Response($this->app['base_url'].'/assets/images/projects/project-'.$id.'.png', 200);
	}

	/**
	 * Find a project by name or id.
	 * 
	 * @param  int/string $id
	 * @return Response
	 */
	public function show($id)
	{
		$project = $this->repo->find($id);

		if ($project) {
			return new Response($project, 200);
		}
	
		return new Response($this->app['translator']->trans('noProjectWithName'), 400);
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