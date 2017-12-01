<?php

namespace App\Http\Controllers;

use Storage;
use App\Project;
use Illuminate\Http\Request;
use Imagine\Gd\Imagine;
use Imagine\Image\Box;
use Imagine\Image\ImageInterface;
use Vebto\Bootstrap\Controller;

class ProjectThumbnailController extends Controller
{
    /**
     * @var Request
     */
    private $request;
    /**
     * @var Project
     */
    private $project;
    /**
     * @var Imagine
     */
    private $imagine;

    /**
     * ProjectThumbnailController constructor.
     *
     * @param Request $request
     * @param Project $project
     * @param Imagine $imagine
     */
    public function __construct(Request $request, Project $project, Imagine $imagine)
    {
        $this->request = $request;
        $this->project = $project;
        $this->imagine = $imagine;
    }

    public function store($projectId)
    {
        $project = $this->project->find($projectId);

        $this->authorize('update', $project);

        $path = "project-thumbnails/$projectId.png";
        $thumbnail = $this->generateThumbnail();

        Storage::disk('public')->put($path, $thumbnail);

        return $this->success(['path' => $path]);
    }

    /**
     * Generate project thumbnail.
     *
     * @return string
     */
    private function generateThumbnail()
    {
        $string = preg_replace('/data:image\/.+?;base64,/', '', $this->request->get('dataUrl'));

        $size = new Box(260, 160);
        $mode = ImageInterface::THUMBNAIL_INSET;

        return (string) $this->imagine->load(base64_decode($string))->thumbnail($size, $mode);
    }
}
