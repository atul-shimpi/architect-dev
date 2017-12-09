<?php namespace App\Services;

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
                'config' => json_decode($this->storage->get("$path/config.json")),
                'thumbnail' => "$path/thumbnail.png"
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
            'config' => json_decode($this->storage->get("templates/$name/config.json")),
            'thumbnail' => "storage/templates/$name/thumbnail.png",
            'pages' => $pages,
            'css' => $this->storage->get("templates/$name/css/styles.css"),
            'js' => $this->storage->get("templates/$name/js/scripts.js"),
        ];
    }
}