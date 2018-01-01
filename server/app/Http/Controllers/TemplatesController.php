<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
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
     * @return LengthAwarePaginator
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
	public function index()
	{
	    $this->authorize('index', 'Template');

	    $templates = $this->templateLoader->loadAll();

	    $paginator = new LengthAwarePaginator(
	        $templates,
            count($templates),
            $this->request->get('per_page', 10),
            $this->request->get('page', 1)
        );

	    return $paginator;
	}

    /**
     * Get template by specified name.
     *
     * @param string $name
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function show($name)
    {
        $this->authorize('show', 'Template');

        try {
            $template = $this->templateLoader->load($name);
        } catch (FileNotFoundException $exception) {
            return abort(404);
        }

        return $this->success(['template' => $template]);
    }

    public function create()
    {
        $this->authorize('create', 'Template');

    }

    /**
     * Delete template matching specified name.
     *
     * @param string $name
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function destroy($name)
    {
        $this->authorize('destroy', 'Template');

        $this->templateLoader->delete($name);

        return $this->success();
    }
}