<?php

namespace App\Console\Commands;

use File;
use App\BuilderPage;
use App\Template;
use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Collection;

class ConvertLegacyTemplates extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'legacy:fix_templates';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * @var Template
     */
    private $template;

    /**
     * @var BuilderPage
     */
    private $builderPage;

    /**
     * Create a new command instance.
     *
     * @param Template $template
     * @param BuilderPage $builderPage
     */
    public function __construct(Template $template, BuilderPage $builderPage)
    {
        parent::__construct();

        $this->template = $template;
        $this->builderPage = $builderPage;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        //in database
        $this->builderPage->where('pageable_type', Template::class)->chunk(10, function(Collection $pages) {
            $pages->each(function(BuilderPage $page) {
                $page->html = $this->fixHtmlImagePaths($page->html);
                $page->css = $this->fixCssImagePaths($page->css);
                $page->save();
            });
        });

        //on disk
        $path = config('filesystems.disks.public.root').'/templates';
        $templates = File::directories($path);

        foreach ($templates as $templatePath) {
            $paths = File::AllFiles($templatePath);

            collect($paths)->filter(function($path) {
                return str_contains($path, '.html');
            })->each(function($path) {
                File::put($path, $this->fixHtmlImagePaths(File::get($path)));
            });

            collect($paths)->filter(function($path) {
                return str_contains($path, '.css');
            })->each(function($path) {
                File::put($path, $this->fixCssImagePaths(File::get($path)));
            });
        }

        $this->info('Fixed legacy templates.');
    }

    /**
     * @param string $html
     * @return string
     */
    public function fixHtmlImagePaths($html)
    {
        return preg_replace("/templates\/.+?\/(images\/.+?)/i", "$1", $html);
    }

    /**
     * @param string css
     * @return string
     */
    public function fixCssImagePaths($css)
    {
        return preg_replace("/url\(templates\/.+?\/(images\/.+?)\)/i", 'url("../$1")', $css);
    }

}
