<?php namespace App\Services\Billing\Gateways;

use App;
use Illuminate\Support\Collection;
use Vebto\Settings\Settings;
use App\Services\Billing\Plans\Gateways\StripePlans;
use App\Services\Billing\Plans\Gateways\PaypalPlans;

class GatewayFactory
{
    /**
     * @var Settings
     */
    private $settings;

    private $allPlanGateways = [
        'paypal' => PaypalPlans::class,
        'stripe' => StripePlans::class,
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
}