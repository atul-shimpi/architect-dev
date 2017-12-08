<?php

namespace App\Http\Controllers;

use App\Project;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Http\Request;
use Vebto\Bootstrap\Controller;
use App\Services\ProjectRepository;

class UserSiteController extends Controller
{
    /**
     * @var Project
     */
    private $project;

    /**
     * @var ProjectRepository
     */
    private $projectRepository;

    /**
     * UserSiteController constructor.
     *
     * @param Project $project
     * @param ProjectRepository $projectRepository
     */
    public function __construct(Project $project, ProjectRepository $projectRepository)
    {
        $this->project = $project;
        $this->projectRepository = $projectRepository;
    }

    /**
     * Show specified project's site.
     *
     * @param string $projectName
     * @param string|null $pageName
     * @return string
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function show($projectName, $pageName = null)
    {
        $project = $this->project->where('name', $projectName)->firstOrFail();

        $this->authorize('show', $project);

        try {
            return $this->projectRepository->getPageHtml($project, $pageName);
        } catch (FileNotFoundException $e) {
            return abort(404);
        }
    }
}
