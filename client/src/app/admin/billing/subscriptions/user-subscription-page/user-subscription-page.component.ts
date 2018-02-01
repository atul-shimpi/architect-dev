import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {VebtoConfig} from "vebto-client/core/vebto-config.service";
import {ConfirmModalComponent} from "vebto-client/core/ui/confirm-modal/confirm-modal.component";
import {Modal} from "vebto-client/core/ui/modal.service";
import {Subscriptions} from "../subscriptions.service";
import {CurrentUser} from "vebto-client/auth/current-user";
import {BillingFormatter} from "../../billing-formatter.service";
import {Plan} from "../../plans/plan";
import {finalize, share} from "rxjs/operators";
import {Toast} from "vebto-client/core";
import {Subscription} from "../subscription";
import {SubscriptionCompletedEvent} from "../create-subscription-tabs/create-subscription-tabs.component";
import {Plans} from "../../plans/plans.service";
import {SelectPlanModalComponent} from "../../plans/select-plan-modal/select-plan-modal.component";
import {SubscriptionStepperState} from "../subscription-stepper-state.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {User} from "../../../../../../node_modules/vebto-client/core/types/models/User";

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
        private route: ActivatedRoute,
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
        return this.activeSubscription.ends_at.split(' ')[0];
    }

    public getFormattedRenewDate() {
        if ( ! this.activeSubscription.renews_at) return null;
        return this.activeSubscription.renews_at.split(' ')[0];
    }

    public getPlan(): Plan {
        return this.activeSubscription.plan;
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
            this.cancelSubscription().subscribe(() => {
                this.toast.open('Subscription cancelled.');
            });
        });
    }

    /**
     * Show modal for selecting a new billing plan.
     */
    public showSelectPlanModal() {
        const params = {plans: this.route.snapshot.data.plans};

        this.modal.open(SelectPlanModalComponent, params).afterClosed().subscribe(plan => {
            if ( ! plan) return;
            this.changePlan(plan);
        });
    }

    /**
     * Change user's active subscription plan to specified one.
     */
    public changePlan(plan: Plan) {
        if (this.activeSubscription.plan_id === plan.id) return;

        this.loading = true;

        this.subscriptions
            .changePlan(this.activeSubscription.id, plan)
            .pipe(finalize(() => this.loading = false))
            .subscribe(response => {
                this.currentUser.assignCurrent(response.user);
                this.toast.open('Subscription plan changed.');
            });
    }

    /**
     * Resume cancelled subscription.
     */
    public resumeSubscription() {
        this.loading = true;

        this.subscriptions.resume(this.activeSubscription.id)
            .pipe(finalize(() => this.loading = false))
            .subscribe(response => {
                this.currentUser.setSubscription(response.subscription);
            });
    }

    /**
     * Called after user payment method for active subscription has been changed successfully.
     */
    public onPaymentMethodChange(e: SubscriptionCompletedEvent) {
        //if we've only changed customer card information on same
        //payment gateway, show success message and bail
        if (e.status === 'updated') {
            return this.toast.open('Payment method updated.');
        }

        this.loading = true;

        //otherwise cancel user's subscription on the other gateway
        this.cancelSubscription({delete: true}).subscribe(() => {
            this.toast.open('Payment method updated.');
        });
    }

    /**
     * Cancel currently active user subscription.
     */
    private cancelSubscription(params: {delete?: boolean} = {}): Observable<{user: User}> {
        this.loading = true;

        const request = this.subscriptions.cancel(this.activeSubscription.id, {delete: params.delete})
            .pipe(finalize(() => this.loading = false))
            .pipe(share());

        request.subscribe(response => {
            //set new active subscription, if user had more then one
            this.currentUser.assignCurrent(response.user);
            this.activeSubscription = this.currentUser.getSubscription();
        });

        return request;
    }
}
