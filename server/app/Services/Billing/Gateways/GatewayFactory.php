<?php namespace App\Services\Billing\Gateways;

use App;
use Illuminate\Support\Collection;
use Vebto\Settings\Settings;
use App\Services\Billing\Gateways\Paypal\PaypalGateway;
use App\Services\Billing\Gateways\Stripe\StripeGateway;

class GatewayFactory
{
    /**
     * @var Settings
     */
    private $settings;

    private $gateways = [
        'paypal' => PaypalGateway::class,
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
        return App::make($this->gateways[$name]);
    }

    /**
     * Get currently enabled payment gateways.
     *
     * @return Collection
     */
    public function getEnabledGateways()
    {
        return collect($this->gateways)->filter(function($namespace, $name) {
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