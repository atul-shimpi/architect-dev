import {Injectable} from "@angular/core";
import {Plan} from "./plans/plan";
import {ValueLists} from "../../../../node_modules/vebto-client/core/services/value-lists.service";
import {map} from "rxjs/operators";

@Injectable()
export class BillingFormatter {

    private currencies: object;

    constructor(private valueLists: ValueLists) {}

    public getFullPlanName(plan: Plan) {
        let name = '';
        if (plan.parent) name += plan.parent.name+': ';
        return name += plan.name;
    }

    public getFormattedPlanPrice(plan: Plan): string {
        return this.getCurrencySymbol(plan.currency)+(plan.amount / 100)+'.00';
    }

    private getCurrencySymbol(currency: string) {
       return '$';
    }
}