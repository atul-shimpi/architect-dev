<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Vebto\Bootstrap\Controller;
use App\Services\TemplateLoader;
use Illuminate\Contracts\Filesystem\FileNotFoundException;

class TemplatesController extends Controller {

    /**
     * @var Request
     */
    private $request;

    /**
     * @var TemplateLoader
     */
    private $templateLoader;

    /**
     * Create new ProjectsController instance.
     *
     * @param Request $request
     * @param TemplateLoader $templateLoader
     */
	public function __construct(Request $request, TemplateLoader $templateLoader)
	{
		$this->request = $request;
        $this->templateLoader = $templateLoader;
    }

    /**
     * Return all available templates.
     *
     * @return \Illuminate\Http\JsonResponse
     */
	public function index()
	{
	    $templates = $this->templateLoader->loadAll();

	    return $this->success(['templates' => $templates]);
	}

    /**
     * Get template by specified id.
     *
     * @param string $name
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($name)
    {
        try {
            $template = $this->templateLoader->load($name);
        } catch (FileNotFoundException $exception) {
            return abort(404);
        }

        return $this->success(['template' => $template]);
    }
}