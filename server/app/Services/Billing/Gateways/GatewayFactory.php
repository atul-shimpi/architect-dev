<?php namespace App\Services\Billing\Gateways;

use App;
use Illuminate\Support\Collection;
use Vebto\Settings\Settings;
use App\Services\Billing\Plans\Gateways\PaypalPlans;
use App\Services\Billing\Gateways\Stripe\StripeGateway;

class GatewayFactory
{
    /**
     * @var Settings
     */
    private $settings;

    private $gateways = [
        'paypal' => PaypalPlans::class,
        'stripe' => StripeGateway::class,
    ];

    /**
     * GatewayFactory constructor.
     *
     * @param Settings $settings
     */
    public function __construct(Settings $settings)
    {
        $this->settings = $settings;
    }

    public function getSubscriptionGateway($name)
    {
        return App::make($this->allSubscriptionGateways[$name]);
    }

    /**
     * Get currently enabled payment gateways.
     *
     * @return Collection
     */
    public function getEnabledPlanGateways()
    {
        return collect($this->allPlanGateways)->filter(function($namespace, $name) {
            return $this->settings->get("billing.$name.enable");
        })->map(function($namespace) {
            return App::make($namespace);
        });
    }

    /**
     * Get gateway by specified name.
     *
     * @param string $name
     * @return mixed
     */
    public function get($name)
    {
        return App::make($this->gateways[$name]);
    }
}