import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Plan} from "../../plans/plan";

@Component({
    selector: 'order-summary',
    templateUrl: './order-summary.component.html',
    styleUrls: ['./order-summary.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OrderSummaryComponent {

    /**
     * Billing plan user has selected.
     */
    @Input() plan: Plan;

    /**
     * Return symbol for specified currency.
     */
    public getCurrencySymbol() {
        return '$';
    }
}
