import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {VebtoConfig} from "vebto-client/core/vebto-config.service";
import {ConfirmModalComponent} from "vebto-client/core/ui/confirm-modal/confirm-modal.component";
import {Modal} from "vebto-client/core/ui/modal.service";
import {Subscriptions} from "../subscriptions.service";
import {CurrentUser} from "../../../../../../node_modules/vebto-client/auth/current-user";
import {BillingFormatter} from "../../billing-formatter.service";
import {Plan} from "../../plans/plan";
import {finalize} from "rxjs/operators";
import {User} from "../../../../../../node_modules/vebto-client/core/types/models/User";
import {Toast} from "../../../../../../node_modules/vebto-client/core";
import {PaypalSubscriptions} from "../paypal-subscriptions";
import {Subscription} from "../subscription";

@Component({
    selector: 'user-subscription-page',
    templateUrl: './user-subscription-page.component.html',
    styleUrls: ['./user-subscription-page.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserSubscriptionPageComponent implements OnInit {

    public loading: boolean = false;

    /**
     * Whether credit card form is visible.
     */
    private cardFormVisible: boolean;

    constructor(
        public vebtoConfig: VebtoConfig,
        private modal: Modal,
        private subscriptions: Subscriptions,
        public currentUser: CurrentUser,
        public formatter: BillingFormatter,
        private toast: Toast,
        private paypal: PaypalSubscriptions,
    ) {}

    ngOnInit() {
    }

    public canResume() {
        return this.currentUser.onGracePeriod();
    }

    public canCancel() {
        return this.currentUser.isSubscribed() && !this.currentUser.onGracePeriod();
    }

    public getPlanName(): string {
        return this.formatter.getFullPlanName(this.getPlan());
    }

    public getFormattedEndDate(): string {
        return this.currentUser.getSubscription().ends_at.split(' ')[0];
    }

    public getFormattedRenewDate() {
        return this.currentUser.getSubscription().renews_at.split(' ')[0];
    }

    public getPlanPrice(): string {
        return this.formatter.getFormattedPlanPrice(this.getPlan());
    }

    public getPlan(): Plan {
        return this.currentUser.getSubscription().plan;
    }

    /**
     * Get gateway on which primary user subscription is created.
     */
    public getActiveGateway(): 'paypal'|'stripe' {
        return this.currentUser.getSubscription().gateway;
    }

    /**
     * Ask user to confirm deletion of selected templates
     * and delete selected templates if user confirms.
     */
    public maybeCancelSubscription() {
        this.modal.open(ConfirmModalComponent, {
            title: 'Cancel Subscription',
            body: 'Are you sure you want to cancel your subscription?',
            ok: 'Yes, Cancel',
            cancel: 'Go Back'
        }).afterClosed().subscribe(confirmed => {
            if (!confirmed) return;
            this.loading = true;

            this.subscriptions.cancel(this.currentUser.get('subscriptions')[0].id)
                .pipe(finalize(() => this.loading = false))
                .subscribe(response => {
                    this.currentUser.setSubscription(response.subscription);
                });
        });
    }

    /**
     * Resume cancelled subscription.
     */
    public resumeSubscription() {
        this.loading = true;

        this.subscriptions.resume(this.currentUser.get('subscriptions')[0].id)
            .pipe(finalize(() => this.loading = false))
            .subscribe(response => {
                this.currentUser.setSubscription(response.subscription);
            });
    }

    /**
     * Fired when user changes active credit card successfully.
     */
    public onCardChanged(user: User) {
        this.currentUser.assignCurrent(user);
        this.toast.open('Credit card updated.');
    }

    /**
     * Toggle visibility of credit card form.
     */
    public toggleCardForm() {
        this.cardFormVisible = !this.cardFormVisible;
    }

    public changeGatewayToPaypal() {
        this.loading = true;

        this.paypal.subscribe(this.currentUser.getSubscription().plan).then(() => {
            const sub = this.currentUser.getSubscription({gateway: 'stripe'});

            this.subscriptions.cancel(sub.id).subscribe(response => {
                this.loading = false;
                console.log(response);
            });
        }).catch(() => {
            this.loading = false;
            this.toast.open('There was an issue. Please try again later.');
        })
    }

    public changeGatewayToStripe() {
        this.loading = true;

        this.subscriptions.createOnStripe(this.currentUser.getSubscription().plan).subscribe(() => {
            const sub = this.currentUser.getSubscription({gateway: 'paypal'});

            this.subscriptions.cancel(sub.id).subscribe(response => {
                this.loading = false;
                console.log(response);
            });
        }, () => {
            this.loading = false;
            this.toast.open('There was an issue. Please try again later.');
        });
    }
}
