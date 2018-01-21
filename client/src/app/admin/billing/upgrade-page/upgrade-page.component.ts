import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Plans} from "../plans/plans.service";
import {Plan} from "../plans/plan";
import {Subscriptions} from "../subscriptions/subscriptions.service";
import {finalize} from "rxjs/operators";
import {MatStepper} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";
import {Settings, Toast} from "../../../../../node_modules/vebto-client/core";

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

    public acceptedCards: string[] = [];

    public years = [2020];

    public selectedPlan: Plan;

    public cardModel: CreditCard = {expiration_month: null, expiration_year: null};

    /**
     * Whether any of the billing plans are marked as "recommended"
     */
    public hasRecommendedPlan: boolean = false;

    /**
     * SelectPlanModalComponent Constructor.
     */
    constructor(
        private subscriptions: Subscriptions,
        private route: ActivatedRoute,
        private settings: Settings,
        private router: Router,
        private toast: Toast,
    ) {}

    ngOnInit() {
        this.acceptedCards = this.settings.getJson('billing.accepted_cards', []);

        this.route.data.subscribe(data => {
            this.plans = data.plans;
            this.hasRecommendedPlan = this.plans.filter(plan => plan.recommended).length > 0;
        });
    }

    public selectPlan(plan: Plan) {
        this.selectedPlan = plan;
        this.stepper.next();
    }

    public submitPurchase() {
        this.loading = true;

        this.subscriptions.createOnStripe({plan_id: this.selectedPlan.id, card: this.cardModel})
            .subscribe(response => {
                this.loading = false;
                this.navigateAfterSuccess();
            }, response => {
                this.errors = response.messages;
                this.loading = false;
            });
    }

    private navigateAfterSuccess() {
        this.router.navigate(['/dashboard']);
        this.toast.open('Subscribed to '+this.selectedPlan.name+' successfully');
    }

    public submitWithPaypal() {
        this.loading = true;

        this.subscriptions.createPaypalAgreement(this.selectedPlan.id).subscribe(response => {
            this.loading = false;

            const windowHeight = 650;
            const windowWidth = 450;
            const left = (screen.width/2)-(windowWidth/2);
            const top  = (screen.height/2)-(windowHeight/2);

            window.addEventListener('message', e => {
                if (this.settings.getBaseUrl().indexOf(e.origin) === -1) return;

                this.subscriptions.executePaypalAgreement(e.data.token, this.selectedPlan.id).subscribe(response => {
                    this.navigateAfterSuccess();
                });
            }, false);

            const popup = window.open(
                response.urls.approve,
                'Authenticate PayPal',
                'menubar=0, location=0, toolbar=0, titlebar=0, status=0, scrollbars=1, width='+windowWidth+', height='+windowHeight+', '+'left='+left+', top='+top
            );
        })
    }

    /**
     * Get specified credit card's icon url.
     */
    public getCardIcon(card: string) {
        return this.settings.getAssetUrl() + 'images/billing/'+card+'.png';
    }
}

export interface CreditCard {
    number?: string,
    expiration_month?: number,
    expiration_year?: number,
    cvc?: number,
}