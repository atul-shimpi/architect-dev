<?php namespace App\Services;

use Illuminate\Http\UploadedFile;
use Zipper;
use Storage;

class TemplateRepository
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
     * TemplateRepository constructor.
     */
    public function __construct()
    {
        $this->storage = Storage::disk('public');
        $this->templatesPath = config('filesystems.disks.public.root').'/templates/';
    }

    /**
     * Create a new template.
     *
     * @param array $params
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    public function create($params)
    {
        $name = isset($params['name']) ? $params['name'] : $params['display_name'];
        $this->update($name, $params);
    }

    /**
     * Update template matching specified name.
     *
     * @param string $name
     * @param array $params
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    public function update($name, $params)
    {
        $templatePath = $this->templatesPath.$name;

        //extract template files
        if (isset($params['template'])) {
            Zipper::make($params['template']->getRealPath())->extractTo($templatePath);
        }

        //load config file if it exists
        $configPath = "templates/$name/config.json";
        $config = [];
        if ($this->storage->exists($configPath)) {
            $config = json_decode($this->storage->get($configPath), true);
        }

        //update config file
        foreach (array_except($params, ['template', 'thumbnail']) as $key => $value) {
            $config[$key] = $value;
        }

        $this->storage->put($configPath, json_encode($config, JSON_PRETTY_PRINT));

        //update thumbnail
        if (isset($params['thumbnail'])) {
            $params['thumbnail']->storeAs("templates/$name", 'thumbnail.png', ['disk' => 'public']);
        }
    }

    /**
     * Delete specified templates.
     *
     * @param array $names
     */
    public function delete($names)
    {
        foreach ($names as $name) {
            $this->storage->deleteDirectory("templates/$name");
        }
    }
}