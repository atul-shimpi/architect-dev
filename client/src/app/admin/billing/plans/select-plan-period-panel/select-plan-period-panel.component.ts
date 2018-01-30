import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Plan} from "../plan";
import {BillingFormatter} from "../../billing-formatter.service";
import {SubscriptionStepperState} from "../../subscriptions/subscription-stepper-state.service";

@Component({
    selector: 'select-plan-period-panel',
    templateUrl: './select-plan-period-panel.component.html',
    styleUrls: ['./select-plan-period-panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SelectPlanPeriodPanelComponent {

    /**
     * Whether sidebar should be visible.
     */
    @Input() showSidebar: boolean = false;

    /**
     * Fired when user selects plan period.
     */
    @Output() selected = new EventEmitter();

    /**
     * SelectPlanPeriodPanelComponent Constructor.
     */
    constructor(
        public formatter: BillingFormatter,
        public state: SubscriptionStepperState
    ) {}

    /**
     * Get price decrease percentage between specified plans.
     */
    public getPlanSavings(expensive: Plan, cheap: Plan): number {
        return (expensive.amount-cheap.amount)/expensive.amount * 100;
    }

    /**
     * Format plan amount. For example, convert cents to dollars.
     */
    public formatPlanAmount(amount: number): number {
        return amount / 100;
    }
}
