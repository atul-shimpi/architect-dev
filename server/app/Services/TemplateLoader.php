<?php namespace App\Services;

use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Storage;

class TemplateLoader
{
    /**
     * @var string
     */
    private $templatesPath;

    /**
     * @var \Illuminate\Filesystem\FilesystemAdapter
     */
    private $storage;

    const DEFAULT_THUMBNAIL = 'client/assets/images/default_project_thumbnail.png';

    /**
     * TemplateLoader constructor.
     */
    public function __construct()
    {
        $this->storage = Storage::disk('public');
        $this->templatesPath = config('filesystems.disks.public.root').'/templates';
    }

    /**
     * Load all available templates.
     *
     * @return Collection
     */
    public function loadAll()
    {
        $paths = $this->storage->directories("templates");

        return collect($paths)->map(function($path) {
            return [
                'name' => basename($path),
                'config' => $this->getTemplateConfig(basename($path)),
                'thumbnail' => $this->getTemplateImagePath("$path/thumbnail.png", self::DEFAULT_THUMBNAIL)
            ];
        });
    }

    /**
     * Load specified template from the disk.
     *
     * @param string $name
     * @return array
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    public function load($name)
    {
        $paths = $this->storage->files("templates/$name");

        $pages = collect($paths)->filter(function($path) {
            return str_contains($path, '.html');
        })->map(function($path) use($name) {
            return [
                'name' => basename($path, '.html'),
                'html' => $this->storage->get($path),
            ];
        })->values();

        return [
            'name' => $name,
            'config' => $this->getTemplateConfig($name),
            'thumbnail' => $this->getTemplateImagePath("storage/templates/$name/thumbnail.png", self::DEFAULT_THUMBNAIL),
            'pages' => $pages,
            'css' => $this->getTemplateAsset("templates/$name/css/styles.css"),
            'js' => $this->getTemplateAsset("templates/$name/js/scripts.js"),
        ];
    }

    /**
     * Check if specified template exists.
     *
     * @param string $name
     * @return bool
     */
    public function exists($name)
    {
        return $this->storage->exists("templates/$name");
    }

    /**
     * Get template asset at specified path or default.
     *
     * @param string $path
     * @param string $default
     * @return string
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    private function getTemplateAsset($path, $default = '')
    {
        if ($this->storage->exists($path)) {
            return $this->storage->get($path);
        }

        return $default;
    }

    /**
     * Get template image path or default.
     *
     * @param string $path
     * @param string $default
     * @return string
     */
    private function getTemplateImagePath($path, $default = '')
    {
        if ($this->storage->exists($path)) {
            return $path;
        }

        return $default;
    }

    /**
     * Get template configuration.
     *
     * @param string $name
     * @return array
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    private function getTemplateConfig($name)
    {
        $path = "templates/$name/config.json";
        $config = [];

        if ($this->storage->exists($path)) {
            $config = json_decode($this->storage->get($path), true);
        }

        $config['framework'] = Arr::get($config, 'framework', 'bootstrap-3');

        return $config;
    }
}