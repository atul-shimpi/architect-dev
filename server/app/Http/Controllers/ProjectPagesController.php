<?php namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;
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

    public function store($projectId)
    {
        $this->validate($this->request, [
            'name' => 'required|string|max:255',
        ]);

        $page = $this->project->findOrFail($projectId)->pages()->create([
            'name' => $this->request->get('name'),
        ]);

        return $this->success(['page' => $page]);
    }
}
