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
     * Create a new subscription.
     */
    public create(params: {plan_id: number, card: CreditCard}): Observable<{subscription: Subscription}> {
        return this.http.post('billing/subscriptions', params);
    }

    /**
     * Update subscription matching specified id.
     */
    public update(id: number, params: object): Observable<{subscription: Subscription}> {
        return this.http.put('billing/subscriptions/'+id, params);
    }

    /**
     * Delete subscription matching specified id.
     */
    public delete(params: {ids: number[]}): Observable<any> {
        return this.http.delete('billing/subscriptions', params);
    }
}
