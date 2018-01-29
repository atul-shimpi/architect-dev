import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Plan} from "../plans/plan";
import {Subscriptions} from "../subscriptions/subscriptions.service";
import {MatStepper} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";
import {Settings, Toast} from "vebto-client/core";

@Component({
    selector: 'upgrade-page',
    templateUrl: './upgrade-page.component.html',
    styleUrls: ['./upgrade-page.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class UpgradePageComponent implements OnInit {
    @ViewChild(MatStepper) stepper: MatStepper;

    public loading = false;

    public errors: {card: CreditCard} = {card: {}};

    /**
     * All available plans. 
     */
    public plans: Plan[] = [];

    public acceptedCards: string[] = [];

    public currencies: object = {};

    /**
     * SelectPlanModalComponent Constructor.
     */
    constructor(
        private subscriptions: Subscriptions,
        private route: ActivatedRoute,
        public settings: Settings,
        private router: Router,
        private toast: Toast,
    ) {}

    ngOnInit() {
        this.acceptedCards = this.settings.getJson('billing.accepted_cards', []);

        this.route.data.subscribe(data => {
            this.plans = data.plans;
            this.currencies = data.currencies;
        });
    }

    public getCurrencySymbol(currency: string) {
        return this.currencies[currency.toUpperCase()]['symbol'];
    }

    public selectPlan(plan: Plan) {
        this.selectedPlan = plan;
        this.selectedPlanId = plan.id;
        this.stepper.next();
    }

    private navigateAfterSuccess() {
        this.router.navigate(['/dashboard']);
        this.toast.open('Subscribed to '+this.selectedPlan.name+' successfully');
    }
}

export interface CreditCard {
    number?: number|string,
    expiration_month?: number|string,
    expiration_year?: number|string,
    security_code?: number|string,
}