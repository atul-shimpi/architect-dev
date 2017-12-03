<?php namespace App\Http\Controllers;

use App\Template;
use Illuminate\Http\Request;
use Vebto\Bootstrap\Controller;

class TemplatesController extends Controller {

	/**
	 * @var Template
	 */
	private $model;

    /**
     * @var Request
     */
    private $request;

    /**
     * Create new ProjectsController instance.
     *
     * @param Request $request
     * @param Template $model
     */
	public function __construct(Request $request, Template $model)
	{
		$this->model = $model;
		$this->request = $request;
	}

    /**
     * Return all available templates.
     *
     * @return \Illuminate\Http\JsonResponse
     */
	public function index()
	{
	    $templates = $this->model->with('pages')->orderBy('name', 'desc')->get();

	    return $this->success(['templates' => $templates]);
	}
}