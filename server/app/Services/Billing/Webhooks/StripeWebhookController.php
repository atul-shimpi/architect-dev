<?php namespace App\Services\Billing\Webhooks;

use App\Subscription;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Symfony\Component\HttpFoundation\Response;
use App\Services\Billing\Gateways\GatewayFactory;
use App\Services\Billing\Gateways\Stripe\StripeGateway;

class StripeWebhookController extends Controller
{
    /**
     * @var StripeGateway
     */
    private $gateway;

    /**
     * @var Subscription
     */
    private $subscription;

    /**
     * StripeWebhookController constructor.
     *
     * @param GatewayFactory $gatewayFactory
     * @param Subscription $subscription
     */
    public function __construct(GatewayFactory $gatewayFactory, Subscription $subscription)
    {
        $this->gateway = $gatewayFactory->get('stripe');
        $this->subscription = $subscription;
    }

    /**
     * Handle a Stripe webhook call.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handleWebhook(Request $request)
    {
        $payload = json_decode($request->getContent(), true);

        if ($this->gateway->eventExists(($payload['id']))) return null;

        switch ($payload['type']) {
            case 'customer.subscription.deleted':
                return $this->handleCustomerSubscriptionDeleted($payload);
            default:
                return new Response;
        }
    }

    /**
     * Handle a cancelled customer from a Stripe subscription.
     *
     * @param  array  $payload
     * @return \Symfony\Component\HttpFoundation\Response
     */
    protected function handleCustomerSubscriptionDeleted(array $payload)
    {
        $gatewayId = $payload['data']['object']['id'];

        $subscription = $this->subscription->where('gateway_id', $gatewayId)->first();

        if ($subscription && ! $subscription->cancelled()) {
            $subscription->markAsCancelled();
        }

        return new Response('Webhook Handled', 200);
    }
}
