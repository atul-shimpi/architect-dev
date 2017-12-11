<?php namespace App\Services;

use App\BuilderPage;
use Auth;
use App\Project;
use App\Template;
use File;
use Illuminate\Support\Collection;
use Storage;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;
use Vebto\Settings\Settings;

class ProjectRepository
{
    /**
     * @var Project
     */
    private $project;

    /**
     * @var string
     */
    private $templatesPath;

    /**
     * @var \Illuminate\Filesystem\FilesystemAdapter
     */
    private $storage;

    /**
     * @var TemplateLoader
     */
    private $templateLoader;

    /**
     * ProjectRepository Constructor.
     *
     * @param TemplateLoader $templateLoader
     * @param Project $project
     */
    public function __construct(TemplateLoader $templateLoader, Project $project)
    {
        $this->project = $project;
        $this->storage = Storage::disk('public');
        $this->templateLoader = $templateLoader;

        $this->templatesPath = config('filesystems.disks.public.root').'/templates';
    }

    public function load(Project $project)
    {
        $path = $this->getProjectPath($project);

        $pages = $this->loadProjectPages($path);

        $loaded = [
            'model' => $project->toArray(),
            'pages' => $pages,
        ];

        //load custom css
        if ($this->storage->exists("$path/css/styles.css")) {
            $loaded['css'] = $this->storage->get("$path/css/styles.css");
        }

        //load custom js
        if ($this->storage->exists("$path/js/scripts.js")) {
            $loaded['js'] = $this->storage->get("$path/js/scripts.js");
        }

        //load template
        if ($project->template) {
            $loaded['template'] = $this->templateLoader->load($project->template);
        }

        return $loaded;
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

    /**
     * Get html of specified project's page.
     *
     * @param Project $project
     * @param string$name
     * @return string
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    public function getPageHtml(Project $project, $name)
    {
        if ( ! $name) $name = 'index';

        $projectPath = $this->getProjectPath($project);

        $name = str_contains($name, '.html') ? $name : "$name.html";
        $pagePath = "$projectPath/$name";

        //if "index.html" does not exist, load first available page
        if ( ! $this->storage->exists($pagePath)) {
            $name = $this->loadProjectPages($projectPath)->first()['name'];
            $pagePath = "$projectPath/$name.html";
        }

        return $this->storage->get($pagePath);
    }

    public function update(Project $project, $data)
    {
        $projectPath = $this->getProjectPath($project);

        $this->updatePages($project, $data['pages']);

        //custom css
        $this->storage->put("$projectPath/css/styles.css", $data['css']);

        //custom js
        $this->storage->put("$projectPath/js/scripts.js", $data['js']);
    }

    /**
     * Create a new project.
     *
     * @param array $data
     * @return Project
     */
    public function create($data)
    {
        $project = $this->project->create([
            'name' => $data['name'],
            'template' => $data['template']['name'],
            'uuid' => $data['uuid']
        ])->fresh();

        $projectPath = $this->getProjectPath($project);

        $this->applyFramework($projectPath, $project->framework);

        //apply template
        if ($data['template']) {
            $this->applyTemplate($data['template'], $projectPath);
        }

        //create pages
        $this->updatePages($project, $data['pages']);

        //attach to user
        $project->users()->attach(Auth::user()->id);

        return $project;
    }

    /**
     * Delete specified project.
     *
     * @param Project $project
     * @return bool|null
     * @throws \Exception
     */
    public function delete(Project $project)
    {
        $path = $this->getProjectPath($project);

        $this->storage->deleteDirectory($path);
        return $project->delete();
    }

    /**
     * Update project pages.
     *
     * @param Project $project
     * @param array $pages
     */
    public function updatePages(Project $project, $pages)
    {
        $projectPath = $this->getProjectPath($project);

        //delete old pages
        collect($this->storage->files($projectPath))->filter(function($path) {
            return str_contains($path, '.html');
        })->each(function($path) {
            $this->storage->delete($path);
        });

        //store new pages
        collect($pages)->each(function($page) use ($projectPath) {
            $this->storage->put("$projectPath/{$page['name']}.html", $page['html']);
        });
    }

    private function applyFramework($projectPath, $framework)
    {
        //add framework
        $this->storage->put(
            "$projectPath/css/framework.css",
            File::get(resource_path("builder/frameworks/$framework/styles.min.css"))
        );

        $this->storage->put(
            "$projectPath/js/framework.js",
            File::get(resource_path("builder/frameworks/$framework/scripts.min.js"))
        );

        //font awesome
        $this->storage->put(
            "$projectPath/css/font-awesome.css",
            File::get(resource_path("builder/css/font-awesome.min.css"))
        );

        //fonts
        collect(File::files(resource_path("builder/fonts")))->each(function($path) use($projectPath) {
            $this->storage->put(
                "$projectPath/fonts/".basename($path),
                File::get($path)
            );
        });

        //jquery
        $this->storage->put(
            "$projectPath/js/jquery.min.js",
            File::get(resource_path("builder/js/jquery.min.js"))
        );

        //thumbnail
        $this->storage->put(
            "$projectPath/thumbnail.png",
            File::get(public_path('assets/images/default_project_thumbnail.png'))
        );

        //custom css
        $this->storage->put("$projectPath/css/styles.css", '');

        //custom js
        $this->storage->put("$projectPath/js/scripts.js", '');
    }

    private function applyTemplate($templateData, $projectPath)
    {
        $templateName = strtolower(kebab_case($templateData['name']));

        $this->copyImages($templateName, $projectPath);

        //copy template css and js
        $this->storage->put("$projectPath/css/template.css", $templateData['css']);
        $this->storage->put("$projectPath/js/template.js", $templateData['js']);

        //libraries
        collect($templateData['config']['libraries'])->each(function($library) use($projectPath) {
            $name = strtolower(kebab_case($library));
            $content = File::get(resource_path("builder/js/libraries/$name.js"));
            $this->storage->put("$projectPath/js/$name.js", $content);
        });

        //thumbnail
        $this->storage->put("$projectPath/thumbnail.png", File::get($templateData['thumbnail']));
    }

    /**
     * @param string $templateName
     * @param $projectPath
     * @param null $imagesPath
     */
    public function copyImages($templateName, $projectPath, $imagesPath = null)
    {
        $templatePath = "$this->templatesPath/$templateName";

        if ( ! $imagesPath) {
            $imagesPath = "$templatePath/images";
        }

        $files = Finder::create()->ignoreDotFiles(true)->in($imagesPath);

        collect($files)->each(function (SplFileInfo $file) use ($projectPath, $templatePath, $templateName) {
            if ($file->isFile()) {
                $imagePath = str_replace($templatePath.'/', '', $file->getPathname());
                $this->storage->put("$projectPath/$imagePath", File::get($file->getRealPath()));
            } else if ($file->isDir()) {
                $this->copyImages($templateName, $projectPath, $file->getRealPath());
            }
        });
    }

    /**
     * Load all pages for specified project.
     *
     * @param string $path
     * @return Collection
     */
    private function loadProjectPages($path)
    {
        return collect($this->storage->files($path))->filter(function ($path) {
            return str_contains($path, '.html');
        })->map(function ($path) {
            return ['name' => basename($path, '.html'), 'html' => $this->storage->get($path)];
        })->values();
    }
}