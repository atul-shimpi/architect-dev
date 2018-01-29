import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BillingFormatter} from "../../../billing-formatter.service";
import {Plans} from "../../../plans/plans.service";
import {Plan} from "../../../plans/plan";

@Component({
    selector: 'subscription-period-step',
    templateUrl: './subscription-period-step.component.html',
    styleUrls: ['./subscription-period-step.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SubscriptionPeriodStepComponent implements OnInit {

    /**
     * All available plans.
     */
    public plans: Plan[] = [];

    /**
     * Billing plan user has selected.
     */
    public selectedPlan: Plan;

    /**
     * Child of main plan user has selected, for example yearly plan.
     */
    public selectedPlanChild: Plan;

    /**
     * Interval (in months) user selected to be charged on.
     */
    public selectedPlanId: number = 12;

    /**
     * SelectPlanTableComponent Constructor.
     */
    constructor(
        public formatter: BillingFormatter,
        private plansApi: Plans
    ) {}

    ngOnInit() {
    }

    /**
     * Select child plan by specified ID.
     */
    public selectChildPlan(id: number) {
        this.selectedPlanChild = this.plans.find(plan => plan.id === id);
        this.selectedPlanId = id;
    }

    /**
     * Get price decrease percentage between specified plans.
     */
    public getPlanSavings(expensive: Plan, cheap: Plan): number {
        return (expensive.amount-cheap.amount)/expensive.amount * 100;
    }

    /**
     * Get different versions of specified plan.
     * (yearly, weekly, every 2 years etc)
     */
    public getChildPlans(parent: Plan) {
        return this.plans.filter(plan => plan.parent_id === parent.id);
    }

}
