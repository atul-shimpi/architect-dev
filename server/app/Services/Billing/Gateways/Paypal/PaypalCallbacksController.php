<?php namespace App\Services\Billing\Gateways\Paypal;

use Illuminate\Http\Request;
use Vebto\Bootstrap\Controller;

class PaypalCallbacksController extends Controller
{
    /**
     * @var Request
     */
    private $request;

    /**
     * PaypalCallbacksController constructor.
     *
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Called after user approves paypal payment.
     */
    public function approved()
    {
        return view('paypal-popup')->with('token', $this->request->get('token'));
    }

    /**
     * Called after user cancels paypal payment.
     */
    public function canceled()
    {
        dd($this->request->get('token'));
    }


}