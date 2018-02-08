import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {LOCALE_ID} from '@angular/core';
import {Plan} from "../../plans/plan";
import {SubscriptionStepperState} from "../../subscriptions/subscription-stepper-state.service";
import {CurrencyPipe} from "@angular/common";

@Component({
    selector: 'order-summary',
    templateUrl: './order-summary.component.html',
    styleUrls: ['./order-summary.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OrderSummaryComponent {

    /**
     * OrderSummaryComponent constructor.
     */
    constructor(public state: SubscriptionStepperState, @Inject(LOCALE_ID) private locale: string) {}

    /**
     * Get the total amount user will be billed.
     */
    public getPlanTotal(plan: Plan) {
        const amount = plan.amount * plan.interval_count;
        return new CurrencyPipe(this.locale).transform(amount, plan.currency);
    }
}
