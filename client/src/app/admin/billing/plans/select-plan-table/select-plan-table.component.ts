import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {BillingFormatter} from "../../billing-formatter.service";
import {Plan} from "../plan";
import {Plans} from "../plans.service";
import {map} from "rxjs/operators";

@Component({
    selector: 'select-plan-table',
    templateUrl: './select-plan-table.component.html',
    styleUrls: ['./select-plan-table.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SelectPlanTableComponent implements OnInit {

    /**
     * Plans that should be displayed to user.
     */
    @Input() plans: Plan[];

    /**
     * Fired when user selects a plan.
     */
    @Output() selected: EventEmitter<Plan> = new EventEmitter();

    /**
     * Whether any of the billing plans are marked as "recommended"
     */
    public hasRecommendedPlan: boolean = false;

    /**
     * SelectPlanTableComponent Constructor.
     */
    constructor(
        public formatter: BillingFormatter,
        private plansApi: Plans
    ) {}

    async ngOnInit() {
        if ( ! this.plans) {
            this.plans = await this.plansApi.all().pipe(map(response => response.data)).toPromise();
        }

        this.hasRecommendedPlan = this.plans.filter(plan => plan.recommended).length > 0;
    }

    /**
     * Select specified plan.
     */
    public selectPlan(plan: Plan) {
        this.selected.emit(plan);
    }

    /**
     * Format plan amount. For example, convert cents to dollars.
     */
    public formatPlanAmount(amount: number): number {
        return amount / 100;
    }

}
