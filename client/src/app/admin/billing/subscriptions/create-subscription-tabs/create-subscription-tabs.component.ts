import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Subscriptions} from "../subscriptions.service";
import {Plan} from "../../plans/plan";
import {CreditCard} from "../../upgrade-page/upgrade-page.component";
import {CurrentUser} from "vebto-client/auth/current-user";
import {PaypalSubscriptions} from "../paypal-subscriptions";
import {Toast} from "vebto-client/core";
import {User} from "vebto-client/core/types/models/User";
import {Subscription} from "../subscription";

@Component({
    selector: 'create-subscription-tabs',
    templateUrl: './create-subscription-tabs.component.html',
    styleUrls: ['./create-subscription-tabs.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateSubscriptionTabsComponent {

    /**
     * Whether subscription creation is in progress.
     */
    public _loading: boolean = false;

    /**
     * Fired when subscription creation starts or ends.
     */
    @Output() loading: EventEmitter<boolean> = new EventEmitter();

    /**
     * Text for submit purchase button.
     */
    @Input() submitText = 'Submit Purchase';

    /**
     * Whether paypal tab should be disabled.
     */
    @Input() disablePaypalTab: boolean = false;

    /**
     * We're changing user subscription from this one.
     * Used for prorating the new subscription start date.
     */
    @Input() from: Subscription;

    /**
     * Plan user should be subscribed to.
     */
    @Input() plan: Plan;

    /**
     * Fired when subscription is created or updated.
     */
    @Output() completed: EventEmitter<SubscriptionCompletedEvent> = new EventEmitter();

    /**
     * Errors returned from backend.
     */
    public errors: object = {};

    /**
     * CreateSubscriptionTabsComponent constructor.
     */
    constructor(
        private subscriptions: Subscriptions,
        private currentUser: CurrentUser,
        private paypal: PaypalSubscriptions,
        private toast: Toast,
    ) {}

    /**
     * Subscribe user to current plan on stripe gateway.
     */
    public subscribeOnStripe(card: CreditCard) {
        //if user is already subscribed to this plan, fire "updated" event and bail
        if (this.currentUser.getSubscription({gateway: 'stripe', planId: this.plan.id})) {
            return this.completed.emit({status: 'updated'});
        }

        this.startLoading();

        this.subscriptions.createOnStripe({plan_id: this.plan.id, card, start_date: this.from.renews_at})
            .subscribe(response => {
                this.completeSubscription(response.user);
            }, response => {
                this.errors = response.messages;
                this.stopLoading();
            });
    }

    /**
     * Subscribe user to current plan on paypal gateway.
     */
    public subscribeOnPaypal() {
        //if user is already subscribed to this plan, fire "updated" event and bail
        if (this.currentUser.getSubscription({gateway: 'paypal', planId: this.plan.id})) {
            return this.completed.emit({status: 'updated'});
        }

        this.startLoading();

        this.paypal.subscribe({plan: this.plan, start_date: this.from.renews_at}).then(user => {
            this.completeSubscription(user);
        }).catch(() => {
            this.stopLoading();
            this.toast.open('There was an issue. Please try again later.');
        });
    }

    /**
     * Complete subscription creation.
     */
    private completeSubscription(user: User) {
        this._loading = false;
        this.currentUser.assignCurrent(user);
        this.completed.emit({status: 'created'})
    }

    /**
     * Mark component as loading.
     */
    private startLoading() {
        this._loading = true;
        this.loading.emit(true);
    }

    /**
     * Mark component as not loading.
     */
    private stopLoading() {
        this._loading = false;
        this.loading.emit(false);
    }
}

export interface SubscriptionCompletedEvent {
    status: 'created'|'updated'
}