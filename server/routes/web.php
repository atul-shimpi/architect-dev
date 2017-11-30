<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['prefix' => 'secure'], function () {

    //templates
    Route::get('templates', 'TemplatesController@index');

    //projects
    Route::get('projects', 'ProjectsController@index');

    //pages
    Route::post('projects/{projectId}/pages', 'ProjectPagesController@store');
    Route::put('projects/{projectId}/pages/{pageId}', 'ProjectPagesController@update');
    Route::delete('projects/{projectId}/pages/{pageId}', 'ProjectPagesController@destroy');

    //elements
    Route::get('elements/custom', 'ElementsController@custom');

});

Route::get('{all}', '\Vebto\Bootstrap\HomeController@index')->where('all', '.*');
