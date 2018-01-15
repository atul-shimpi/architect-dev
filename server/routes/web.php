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
    Route::get('templates/{name}', 'TemplatesController@show');
    Route::post('templates', 'TemplatesController@store');
    Route::put('templates/{name}', 'TemplatesController@update');
    Route::delete('templates', 'TemplatesController@destroy');

    //themes
    Route::get('themes', 'ThemesController@index');

    //projects
    Route::get('projects', 'ProjectsController@index');
    Route::post('projects/{id}/publish', 'PublishProjectController@publish');
    Route::post('projects', 'ProjectsController@store');
    Route::get('projects/{id}', 'ProjectsController@show');
    Route::put('projects/{id}', 'ProjectsController@update');
    Route::delete('projects', 'ProjectsController@destroy');
    Route::post('projects/{id}/generate-thumbnail', 'ProjectThumbnailController@store');
    Route::get('projects/{id}/download', 'ProjectDownloadController@download');

    //pages
    Route::post('projects/{projectId}/pages', 'ProjectPagesController@store');
    Route::put('projects/{projectId}/pages/{pageName}', 'ProjectPagesController@update');
    Route::delete('projects/{projectId}/pages/{pageName}', 'ProjectPagesController@destroy');

    //elements
    Route::get('elements/custom', 'ElementsController@custom');

    //billing plans
    Route::get('billing/plans', function() {
        return App::call('App\Services\Billing\Plans\BillingPlansController@index');
    });

    Route::post('billing/plans', function() {
        return App::call('App\Services\Billing\Plans\BillingPlansController@store');
    });

    Route::put('billing/plans/{id}', function($id) {
        return App::call('App\Services\Billing\Plans\BillingPlansController@update', ['id' => $id]);
    });

    Route::delete('billing/plans', function() {
        return App::call('App\Services\Billing\Plans\BillingPlansController@destroy');
    });

    //subs
    Route::post('billing/subscriptions/{gateway}', function($gateway) {
        return App::call('App\Services\Billing\Subscriptions\SubscriptionsController@store', ['gateway' => $gateway]);
    });
});

Route::domain('{name}.{domain}.{tls}')->group(function () {
    Route::get('/{page?}', 'UserSiteController@show')->name('user-site-subdomain');
});

Route::get('sites/{name}/{page?}', 'UserSiteController@show')->name('user-site-regular');

Route::get('{all}', '\Vebto\Bootstrap\HomeController@index')->where('all', '.*');
