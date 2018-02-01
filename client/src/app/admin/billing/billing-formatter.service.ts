import {Injectable} from "@angular/core";
import {Plan} from "./plans/plan";
import {ValueLists} from "vebto-client/core/services/value-lists.service";
import {Translations} from "vebto-client/translations/translations.service";

@Injectable()
export class BillingFormatter {

    constructor(private valueLists: ValueLists, private i18n: Translations) {}

    public getFullPlanName(plan: Plan) {
        let name = plan.parent ? plan.parent.name : plan.name;
        name += ' ' + this.i18n.t('Plan');
        if (plan.parent) name += ': ' + plan.name;
        return name;
    }
}