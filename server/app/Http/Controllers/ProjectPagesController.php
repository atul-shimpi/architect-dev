<?php namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Vebto\Bootstrap\Controller;

class ProjectPagesController extends Controller
{
    /**
     * @var Project
     */
    private $project;

    /**
     * @var Request
     */
    private $request;

    /**
     * ProjectPageController Constructor.
     *
     * @param Project $project
     * @param Request $request
     */
    public function __construct(Project $project, Request $request)
    {
        $this->project = $project;
        $this->request = $request;
    }

    /**
     * Create a new page for specified project.
     *
     * @param int $projectId
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function store($projectId)
    {
        $project = $this->project->findOrFail($projectId);

        $this->authorize('store', $project);

        $this->validate($this->request, [
            'name' => [
                'required', 'string', 'max:255',
                Rule::unique('builder_pages')->where('pageable_id', $project->id)
            ],
            'tags' => 'nullable|string|min:1|max:255',
            'title' => 'nullable|string|min:1|max:255',
            'description' => 'nullable|string|min:1|max:255',
            'css' => 'nullable|string',
            'js' => 'nullable|string',
            'html' => 'nullable|string',
        ]);

        $page = $project->pages()->create([
            'name' => $this->request->get('name'),
            'tags' => $this->request->get('tags'),
            'title' => $this->request->get('title'),
            'description' => $this->request->get('description'),
            'html' => $this->request->get('html'),
            'css' => $this->request->get('css'),
            'js' => $this->request->get('js'),
        ]);

        return $this->success(['page' => $page]);
    }

    /**
     * Update specified page.
     *
     * @param $projectId
     * @param $pageId
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function update($projectId, $pageId)
    {
        $project = $this->project->findOrFail($projectId);

        $this->authorize('update', $project);

        $this->validate($this->request, [
            'name' => [
                'string', 'min:1', 'max:255',
                Rule::unique('builder_pages')->where('pageable_id', $project->id)->ignore($pageId)
            ],
            'tags' => 'nullable|string|min:1|max:255',
            'title' => 'nullable|string|min:1|max:255',
            'description' => 'nullable|string|min:1|max:255',
            'css' => 'nullable|string',
            'js' => 'nullable|string',
            'html' => 'nullable|string',
        ]);

        $page = $project->pages()->findOrFail($pageId);

        $page->fill([
            'name' => $this->request->get('name'),
            'tags' => $this->request->get('tags'),
            'title' => $this->request->get('title'),
            'description' => $this->request->get('description'),
        ])->save();

        return $this->success(['page' => $page]);
    }

    /**
     * Delete specified page.
     *
     * @param int $projectId
     * @param int $pageId
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function destroy($projectId, $pageId)
    {
        $project = $this->project->findOrFail($projectId);

        //project should have at least one page
        if ($project->pages()->count() === 1) return $this->error();

        $this->authorize('destroy', $project);

        $project->pages()->findOrFail($pageId)->delete();

        return $this->success();
    }
}