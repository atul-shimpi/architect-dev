import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {BillingFormatter} from "../../billing-formatter.service";
import {Plan} from "../plan";
import {Plans} from "../plans.service";
import {map} from "rxjs/operators";
import {SubscriptionStepperState} from "../../subscriptions/subscription-stepper-state.service";

@Component({
    selector: 'select-plan-panel',
    templateUrl: './select-plan-panel.component.html',
    styleUrls: ['./select-plan-panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SelectPlanPanelComponent implements OnInit {

    /**
     * Whether any of the billing plans are marked as "recommended"
     */
    public hasRecommendedPlan: boolean = false;

    /**
     * SelectPlanTableComponent Constructor.
     */
    constructor(
        public formatter: BillingFormatter,
        public state: SubscriptionStepperState,
    ) {}

    ngOnInit() {
        this.hasRecommendedPlan = this.state.plans.filter(plan => plan.recommended).length > 0;
    }

    /**
     * Format plan amount. For example, convert cents to dollars.
     */
    public formatPlanAmount(amount: number): number {
        return amount / 100;
    }

}
