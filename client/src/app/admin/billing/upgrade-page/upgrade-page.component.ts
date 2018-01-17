import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Plans} from "../plans/plans.service";
import {Plan} from "../plans/plan";
import {Subscriptions} from "../subscriptions/subscriptions.service";
import {finalize} from "rxjs/operators";
import {MatStepper} from "@angular/material";
import {ActivatedRoute} from "@angular/router";
import {Settings} from "../../../../../node_modules/vebto-client/core";

@Component({
    selector: 'upgrade-page',
    templateUrl: './upgrade-page.component.html',
    styleUrls: ['./upgrade-page.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UpgradePageComponent implements OnInit {
    @ViewChild(MatStepper) stepper: MatStepper;

    public loading = false;

    public errors: {card: CreditCard} = {card: {}};

    /**
     * All available plans.
     */
    public plans: Plan[] = [];

    public months = [1,2,3,4,5,6,7,8,9,10,11,12];

    public years = [2020];

    public selectedPlan: Plan;

    public cardModel: CreditCard = {expiration_month: null, expiration_year: null};

    /**
     * SelectPlanModalComponent Constructor.
     */
    constructor(private subscriptions: Subscriptions, private route: ActivatedRoute, private settings: Settings) {
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.plans = data.plans;
        })
    }

    public close() {
        //
    }

    public selectPlan(plan: Plan) {
        this.selectedPlan = plan;
        this.stepper.next();
    }

    public submitPurchase() {
        this.loading = true;

        const params = {plan_id: this.selectedPlan.id, gateway: 'stripe', card: this.cardModel} as any;

        this.subscriptions.create(params)
            .subscribe(response => {
                this.loading = false;
            }, response => {
                this.errors = response.messages;
                this.loading = false;
            });
    }

    public submitWithPaypal() {
        this.subscriptions.create({plan_id: this.selectedPlan.id, gateway: 'paypal'}).subscribe(response => {
            const windowHeight = 650;
            const windowWidth = 450;
            const left = (window.innerWidth/2)-(windowWidth/2);
            const top  = (window.innerHeight/2)-(windowHeight/2);

            window.addEventListener('message', e => {
                if (this.settings.getBaseUrl().indexOf(e.origin) === -1) return;
                console.log(e.data.token);
                //TODO: execute payment
            }, false);

            const popup = window.open(
                response.urls['approve'],
                'Authenticate PayPal',
                'menubar=0, location=0, toolbar=0, titlebar=0, status=0, scrollbars=1, width='+windowWidth+', height='+windowHeight+', '+'left='+left+', top='+top
            );
        })
    }
}

export interface CreditCard {
    number?: string,
    expiration_month?: number,
    expiration_year?: number,
    cvc?: number,
}