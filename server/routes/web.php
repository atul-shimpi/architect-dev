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

    Route::post('billing/plans/sync', function() {
        return App::call('App\Services\Billing\Plans\BillingPlansController@sync');
    });

    Route::put('billing/plans/{id}', function($id) {
        return App::call('App\Services\Billing\Plans\BillingPlansController@update', ['id' => $id]);
    });

    Route::delete('billing/plans', function() {
        return App::call('App\Services\Billing\Plans\BillingPlansController@destroy');
    });

    //subs
    Route::get('billing/subscriptions', function() {
        return App::call('App\Services\Billing\Subscriptions\SubscriptionsController@index');
    });

    Route::post('billing/subscriptions/stripe', function() {
        return App::call('App\Services\Billing\Gateways\Stripe\StripeController@createSubscription');
    });

    Route::post('billing/subscriptions/paypal/agreement/create', function() {
        return App::call('App\Services\Billing\Gateways\Paypal\PaypalController@createSubscriptionAgreement');
    });

    Route::post('billing/subscriptions/paypal/agreement/execute', function() {
        return App::call('App\Services\Billing\Gateways\Paypal\PaypalController@executeSubscriptionAgreement');
    });

    Route::delete('billing/subscriptions/{id}', function($id) {
        return App::call('App\Services\Billing\Subscriptions\SubscriptionsController@cancel', ['id' => $id]);
    });

    Route::post('billing/subscriptions/{id}/resume', function($id) {
        return App::call('App\Services\Billing\Subscriptions\SubscriptionsController@resume', ['id' => $id]);
    });

    Route::post('billing/subscriptions/{id}/change-plan', function($id) {
        return App::call('App\Services\Billing\Subscriptions\SubscriptionsController@changePlan', ['id' => $id]);
    });

    Route::post('billing/stripe/cards/add', function() {
        return App::call('App\Services\Billing\Gateways\Stripe\StripeController@addCard');
    });
});

//paypal
Route::get('billing/paypal/callback/approved', function() {
    return App::call('App\Services\Billing\Gateways\Paypal\PaypalController@approvedCallback');
});

Route::get('billing/paypal/callback/canceled', function() {
    return App::call('App\Services\Billing\Gateways\Paypal\PaypalController@canceledCallback');
});

//stripe webhook
Route::post('billing/stripe/webhook', function() {
    return App::call('App\Services\Billing\Webhooks\StripeWebhookController@handleWebhook');
});

Route::post('billing/paypal/webhook', function() {
    return App::call('App\Services\Billing\Webhooks\PaypalWebhookController@handleWebhook');
});

//user site domains
Route::domain('{name}.{domain}.{tls}')->group(function () {
    Route::get('/{page?}', 'UserSiteController@show')->name('user-site-subdomain');
});

Route::get('sites/{name}/{page?}', 'UserSiteController@show')->name('user-site-regular');

Route::get('{all}', '\Vebto\Bootstrap\HomeController@index')->where('all', '.*');