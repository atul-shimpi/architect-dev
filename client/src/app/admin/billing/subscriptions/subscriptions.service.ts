import {Injectable} from '@angular/core';
import {AppHttpClient} from "vebto-client/core/http/app-http-client.service";
import {Observable} from "rxjs/Observable";
import {PaginationResponse} from "vebto-client/core/types/pagination-response";
import {Subscription} from "./subscription";
import {CreditCard} from "../upgrade-page/upgrade-page.component";

@Injectable()
export class Subscriptions {

    /**
     * Subscriptions constructor.
     */
    constructor(private http: AppHttpClient) {}

    /**
     * Get all available subscriptions.
     */
    public all(params?: object): Observable<PaginationResponse<Subscription>> {
        return this.http.get('billing/subscriptions', params);
    }

    /**
     * Get subscription matching specified id.
     */
    public get(id: number): Observable<{subscription: Subscription}> {
        return this.http.get('billing/subscriptions/'+id);
    }

    /**
     * Create a new subscription on stripe.
     */
    public createOnStripe(params: {plan_id: number, card: CreditCard}): Observable<{subscription: Subscription}> {
        return this.http.post('billing/subscriptions/stripe', params);
    }

    public createPaypalAgreement(plan_id: number): Observable<{urls: {execute: string, approve: string}}> {
        return this.http.post('billing/subscriptions/paypal/agreement/create', {plan_id});
    }

    public executePaypalAgreement(agreement_id: string, plan_id: number) {
        return this.http.post('billing/subscriptions/paypal/agreement/execute', {agreement_id, plan_id});
    }

    /**
     * Update subscription matching specified id.
     */
    public update(id: number, params: object): Observable<{subscription: Subscription}> {
        return this.http.put('billing/subscriptions/'+id, params);
    }

    /**
     * Cancel subscription matching specified id.
     */
    public cancel(id: number): Observable<{subscription: Subscription}> {
        return this.http.delete('billing/subscriptions/'+id);
    }

    public resume(id: number): Observable<{subscription: Subscription}> {
        return this.http.post('billing/subscriptions/'+id+'/resume');
    }
}
