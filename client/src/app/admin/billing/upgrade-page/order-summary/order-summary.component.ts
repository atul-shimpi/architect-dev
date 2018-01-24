import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Plan} from "../../plans/plan";
import {ValueLists} from "vebto-client/core/services/value-lists.service";

@Component({
    selector: 'order-summary',
    templateUrl: './order-summary.component.html',
    styleUrls: ['./order-summary.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OrderSummaryComponent implements OnInit {

    /**
     * Billing plan user has selected.
     */
    @Input() plan: Plan;

    /**
     * Child version of main billing plan user has selected.
     */
    @Input() childPlan: Plan;

    public currencies;

    /**
     * OrderSummaryComponent constructor.
     */
    constructor(private valueLists: ValueLists) {}

    ngOnInit() {
        this.valueLists.get('currencies').subscribe(response => {
            this.currencies = response.currencies;
        });
    }

    /**
     * Get the total amount user will be billed.
     */
    public getPlanTotal(plan: Plan) {
        const amount = plan.amount * plan.interval_count;
        return this.getCurrencySymbol(plan.currency)+this.formatPlanAmount(amount)
    }

    /**
     * Return symbol for specified currency.
     */
    public getCurrencySymbol(currency: string): string {
        if ( ! this.currencies) return '';
        return this.currencies[currency.toUpperCase()]['symbol'];
    }

    /**
     * Format plan amount. For example, convert cents to dollars.
     */
    public formatPlanAmount(amount: number): number {
        return amount / 100;
    }
}
