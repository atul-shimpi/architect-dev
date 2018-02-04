<?php namespace App\Services\Billing\Webhooks;

use App\Services\Billing\Gateways\Paypal\PaypalGateway;
use App\Subscription;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Services\Billing\Gateways\GatewayFactory;

class PaypalWebhookController extends Controller
{
    /**
     * @var PaypalGateway
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
        $this->gateway = $gatewayFactory->get('paypal');
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

        if ($this->gateway->webhookIsValid(($payload))) return null;

        switch ($payload['event_type']) {
            case 'BILLING.SUBSCRIPTION.CANCELLED':
                return $this->handleSubscriptionDeleted($payload);
            case 'PAYMENT.SALE.COMPLETED':
                return $this->handleSubscriptionRenewed($payload);
            default:
                return response('Webhook Handled', 200);
        }
    }

    /**
     * Handle a cancelled customer from a Stripe subscription.
     *
     * @param  array  $payload
     * @return \Symfony\Component\HttpFoundation\Response
     */
    protected function handleSubscriptionDeleted($payload)
    {
        $gatewayId = $payload['resource']['id'];

        $subscription = $this->subscription->where('gateway_id', $gatewayId)->first();

        if ($subscription && ! $subscription->cancelled()) {
            $subscription->markAsCancelled();
        }

        return response('Webhook Handled', 200);
    }

    /**
     * Handle a renewed stripe subscription.
     *
     * @param  array  $payload
     * @return \Symfony\Component\HttpFoundation\Response
     */
    protected function handleSubscriptionRenewed($payload)
    {
        if ( ! isset($payload['resource']['billing_agreement_id'])) {
            return response('Webhook Handled', 200);
        }

        $gatewayId = $payload['resource']['billing_agreement_id'];

        $subscription = $this->subscription->where('gateway_id', $gatewayId)->first();

        if ($subscription) {
            $stripeSubscription = $this->gateway->subscriptions()->find($subscription);
            $subscription->fill(['renews_at' => $stripeSubscription['renews_at']])->save();
        }

        return response('Webhook Handled', 200);
    }
}
