import {Injectable} from '@angular/core';
import {AppHttpClient} from "vebto-client/core/http/app-http-client.service";
import {Observable} from "rxjs/Observable";
import {PaginationResponse} from "vebto-client/core/types/pagination-response";
import {Subscription} from "./subscription";
import {CreditCard} from "../upgrade-page/upgrade-page.component";
import {User} from "../../../../types/models/User";
import {Plan} from "../plans/plan";
import {Settings} from "../../../../../node_modules/vebto-client/core";
import {Resolve} from "@angular/router";
import {Subject} from "rxjs/Subject";

@Injectable()
export class PaypalSubscriptions {

    private popupWidth = 450;
    private popupHeight: 650;

    /**
     * Params for popup window.
     */
    private popupParams = {
        menubar: 0,
        location: 0,
        toolbar: 0,
        titlebar: 0,
        status: 0,
        crollbars: 1,
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
    public subscribe(plan: Plan) {
        return new Promise((resolve, reject) => {
            this.createPaypalAgreement(plan.id).subscribe(response => {
                this.listenForMessages(plan, resolve);
                this.openPaypalPopup(response.urls.approve);
            }, () => reject());
        });
    }

    /**
     * Listen for messages from paypal window and execute paypal agreement.
     */
    private listenForMessages(plan: Plan, resolve: Function) {
        window.addEventListener('message', e => {
            if (this.settings.getBaseUrl().indexOf(e.origin) === -1) return;
            this.executePaypalAgreement(e.data.token, plan.id).subscribe(() => resolve());
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

    private createPaypalAgreement(plan_id: number): Observable<{urls: {execute: string, approve: string}}> {
        return this.http.post('billing/subscriptions/paypal/agreement/create', {plan_id});
    }

    private executePaypalAgreement(agreement_id: string, plan_id: number) {
        return this.http.post('billing/subscriptions/paypal/agreement/execute', {agreement_id, plan_id});
    }
}