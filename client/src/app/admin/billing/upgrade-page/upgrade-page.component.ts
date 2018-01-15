import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Plans} from "../plans/plans.service";
import {Plan} from "../plans/plan";
import {Subscriptions} from "../subscriptions/subscriptions.service";
import {finalize} from "rxjs/operators";
import {MatStepper} from "@angular/material";
import {ActivatedRoute} from "@angular/router";

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
    constructor(private subscriptions: Subscriptions, private route: ActivatedRoute) {
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

        const params = {plan_id: this.selectedPlan.id, gateway: 'stripe', card: this.cardModel};

        this.subscriptions.create(params)
            .subscribe(response => {
                this.loading = false;
            }, response => {
                this.errors = response.messages;
                this.loading = false;
            });
    }

    public submitWithPaypal() {
        this.subscriptions.create({plan_id: this.selectedPlan.id, gateway: 'paypal'}).subscribe()
    }
}

export interface CreditCard {
    number?: string,
    expiration_month?: number,
    expiration_year?: number,
    cvc?: number,
}