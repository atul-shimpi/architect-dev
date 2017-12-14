<?php namespace App\Http\Controllers;

use App\Theme;
use Illuminate\Http\Request;
use Vebto\Bootstrap\Controller;

class ThemesController extends Controller {

    /**
     * @var Request
     */
    private $request;

    /**
     * @var Theme
     */
    private $theme;

    /**
     * Create new ThemesController instance.
     *
     * @param Request $request
     * @param Theme $theme
     */
	public function __construct(Request $request, Theme $theme)
	{
        $this->theme = $theme;
		$this->request = $request;
    }

    /**
     * Return all available templates.
     *
     * @return \Illuminate\Http\JsonResponse
     */
	public function index()
	{
	    $themes = $this->theme->all();

	    return $this->success(['themes' => $themes]);
	}
}