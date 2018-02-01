import {Injectable} from '@angular/core';
import {AppHttpClient} from "vebto-client/core/http/app-http-client.service";
import {Observable} from "rxjs/Observable";
import {Settings} from "vebto-client/core/services/settings.service";
import {User} from "vebto-client/core/types/models/User";

@Injectable()
export class PaypalSubscriptions {

    private popupWidth = 450;
    private popupHeight = 650;

    /**
     * Params for popup window.
     */
    private popupParams = {
        menubar: 0,
        location: 0,
        toolbar: 0,
        titlebar: 0,
        status: 0,
        scrollbars: 1,
        width: this.popupWidth,
        height: this.popupHeight
    };

    /**
     * PaypalSubscriptions constructor.
     */
    constructor(private http: AppHttpClient, private settings: Settings) {}

    /**
     * Subscribe to specified plan on paypal.
     */
    public subscribe(params: {plan_id: number, start_date?: string}): Promise<User> {
        return new Promise((resolve, reject) => {
            this.createPaypalAgreement(params).subscribe(response => {
                this.listenForMessages(params.plan_id, resolve);
                this.openPaypalPopup(response.urls.approve);
            }, () => reject());
        });
    }

    /**
     * Listen for messages from paypal window and execute paypal agreement.
     */
    private listenForMessages(planId: number, resolve: Function) {
        window.addEventListener('message', e => {
            if (this.settings.getBaseUrl().indexOf(e.origin) === -1) return;
            this.executePaypalAgreement(e.data.token, planId).subscribe(response => resolve(response.user));
        }, false);
    }

    /**
     * Open new paypal express popup window.
     */
    private openPaypalPopup(url: string) {
        const params = Object.assign({}, this.popupParams, {
            left: (screen.width/2)-(this.popupWidth/2),
            top: (screen.height/2)-(this.popupHeight/2)
        });

        window.open(
            url,
            'Authenticate PayPal',
            Object.keys(params).map(key => key+'='+params[key]).join(', '),
        );
    }

    private createPaypalAgreement(params: {plan_id: number, start_date?: string}): Observable<{urls: {execute: string, approve: string}}> {
        return this.http.post('billing/subscriptions/paypal/agreement/create', {plan_id: params.plan_id, start_date: params.start_date});
    }

    private executePaypalAgreement(agreement_id: string, plan_id: number): Observable<{user: User}> {
        return this.http.post('billing/subscriptions/paypal/agreement/execute', {agreement_id, plan_id});
    }
}