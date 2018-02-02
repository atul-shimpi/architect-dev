import {Component, ViewEncapsulation} from '@angular/core';
import {Plan} from "../../plans/plan";
import {SubscriptionStepperState} from "../../subscriptions/subscription-stepper-state.service";

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
    constructor(public state: SubscriptionStepperState) {}

    /**
     * Get the total amount user will be billed.
     */
    public getPlanTotal(plan: Plan) {
        const amount = plan.amount * plan.interval_count;
        return plan.currency_symbol+this.formatPlanAmount(amount)
    }

    /**
     * Format plan amount. For example, convert cents to dollars.
     */
    public formatPlanAmount(amount: number): number {
        return amount / 100;
    }
}
