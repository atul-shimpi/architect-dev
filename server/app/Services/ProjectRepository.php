<?php namespace App\Services;

use App\BuilderPage;
use Auth;
use App\Project;
use App\Template;
use File;
use Storage;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;

class ProjectRepository
{
    /**
     * @var Template
     */
    private $template;

    /**
     * @var Project
     */
    private $project;

    private $templatesPath;

    /**
     * ProjectRepository Constructor.
     *
     * @param Template $template
     * @param Project $project
     */
    public function __construct(Template $template, Project $project)
    {
        $this->template = $template;
        $this->project = $project;

        $this->templatesPath = config('filesystems.disks.public.root').'/templates';
    }

    public function load(Project $project)
    {
        $path = $this->getProjectPath($project);

        $pages = collect(Storage::disk('public')->files($path))->filter(function($path) {
            return str_contains($path, '.html');
        })->map(function($path) {
            return ['name' => basename($path, '.html'), 'html' => Storage::disk('public')->get($path)];
        })->values();

        return [
            'model' => $project->toArray(),
            'pages' => $pages,
            'template' => [
                'css' => Storage::disk('public')->get("$path/css/template.css"),
                'js' => Storage::disk('public')->get("$path/js/template.js"),
            ]
        ];
    }

    /**
     * Get path for the specified project.
     *
     * @param Project $project
     * @return string
     */
    private function getProjectPath(Project $project)
    {
        return 'projects/' . Auth::user()->id . '/' . $project->uuid;
    }

    public function create($data)
    {
        $project = $this->project->create(['name' => $data['name']])->fresh();
        $projectPath = $this->getProjectPath($project);

        //apply template
        if ($data['templateId']) {
            $this->applyTemplate($data['templateId'], $projectPath, $project, $data);
        }

        //attach to user
        $project->users()->attach(Auth::user()->id);

        $project = $project->load('pages')->toArray();

        foreach ($project['pages'] as $key => $page) {
            $project['pages'][$key]['html'] = Storage::get($projectPath . '/' . $page['name'] . '.html');
        }

        return $project;
    }

    private function applyTemplate($templateId, $projectPath, Project $project, $data)
    {
        $template = $this->template->with('pages')->findOrFail($templateId);

        $this->copyImages($template, $projectPath);

        //copy template css and js
        Storage::disk('public')->put("$projectPath/css/template.css", $data['template']['css']);
        Storage::disk('public')->put("$projectPath/js/template.js", $data['template']['js']);

        //add framework
        Storage::disk('public')->put(
            "$projectPath/css/framework.css",
            File::get(resource_path("builder/frameworks/$project->framework/styles.min.css"))
        );

        Storage::disk('public')->put(
            "$projectPath/js/framework.js",
            File::get(resource_path("builder/frameworks/$project->framework/scripts.min.js"))
        );

        //font awesome
        Storage::disk('public')->put(
            "$projectPath/css/font-awesome.css",
            File::get(resource_path("builder/css/font-awesome.min.css"))
        );

        //fonts
        collect(File::files(resource_path("builder/fonts")))->each(function($path) use($projectPath) {
            Storage::disk('public')->put(
                "$projectPath/fonts/".basename($path),
                File::get($path)
            );
        });

        //jquery
        Storage::disk('public')->put(
            "$projectPath/js/jquery.min.js",
            File::get(resource_path("builder/js/jquery.min.js"))
        );

        //thumbnail
        $templatePath = "$this->templatesPath/".strtolower($template->name)."/thumbnail.png";
        Storage::disk('public')->put(
            "$projectPath/thumbnail.png",
            File::get($templatePath)
        );

        //create pages on disk
        collect($data['pages'])->each(function ($page) use ($projectPath) {
            Storage::disk('public')->put("$projectPath/{$page['name']}.html", $page['html']);
        });
    }

    /**
     * @param $template
     * @param $projectPath
     * @param null $imagesPath
     */
    public function copyImages($template, $projectPath, $imagesPath = null)
    {
        $templatePath = "$this->templatesPath/".strtolower($template->name);

        if ( ! $imagesPath) {
            $imagesPath = "$templatePath/images";
        }

        $files = Finder::create()->ignoreDotFiles(true)->in($imagesPath);

        collect($files)->each(function (SplFileInfo $file) use ($projectPath, $templatePath, $template) {
            if ($file->isFile()) {
                $imagePath = str_replace($templatePath.'/', '', $file->getPathname());
                Storage::disk('public')->put("$projectPath/$imagePath", File::get($file->getRealPath()));
            } else if ($file->isDir()) {
                $this->copyImages($template, $projectPath, $file->getRealPath());
            }
        });
    }
}