import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {VebtoConfig} from "vebto-client/core/vebto-config.service";
import {ConfirmModalComponent} from "vebto-client/core/ui/confirm-modal/confirm-modal.component";
import {Modal} from "vebto-client/core/ui/modal.service";
import {Subscriptions} from "../subscriptions.service";
import {CurrentUser} from "vebto-client/auth/current-user";
import {BillingFormatter} from "../../billing-formatter.service";
import {Plan} from "../../plans/plan";
import {finalize} from "rxjs/operators";
import {Toast} from "vebto-client/core";
import {Subscription} from "../subscription";
import {SubscriptionCompletedEvent} from "../create-subscription-tabs/create-subscription-tabs.component";

@Component({
    selector: 'user-subscription-page',
    templateUrl: './user-subscription-page.component.html',
    styleUrls: ['./user-subscription-page.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class UserSubscriptionPageComponent implements OnInit {

    public loading: boolean = false;

    /**
     * Currently active user's subscription.
     */
    public activeSubscription: Subscription;

    constructor(
        public vebtoConfig: VebtoConfig,
        private modal: Modal,
        private subscriptions: Subscriptions,
        public currentUser: CurrentUser,
        public formatter: BillingFormatter,
        private toast: Toast,
    ) {}

    ngOnInit() {
        this.activeSubscription = this.currentUser.getSubscription();
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
            if ( ! confirmed) return;
            this.cancelSubscription();
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

    public onPaymentMethodChange(e: SubscriptionCompletedEvent) {
        //if we've only changed customer card information on same
        //payment gateway, show success message and bail
        if (e.status === 'updated') {
            return this.toast.open('Payment method updated.');
        }

        this.loading = true;

        //otherwise cancel user's subscription on the other gateway
        this.subscriptions.cancel(this.activeSubscription.id, {delete: true})
            .pipe(finalize(() => this.loading = false))
            .subscribe(response => {
                //set new active subscription, if user had more then one
                this.currentUser.assignCurrent(response.user);
                this.activeSubscription = this.currentUser.getSubscription();
            });
    }
}
