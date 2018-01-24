import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {VebtoConfig} from "vebto-client/core/vebto-config.service";
import {ConfirmModalComponent} from "vebto-client/core/ui/confirm-modal/confirm-modal.component";
import {Modal} from "vebto-client/core/ui/modal.service";
import {Subscriptions} from "../subscriptions.service";
import {CurrentUser} from "../../../../../../node_modules/vebto-client/auth/current-user";

@Component({
    selector: 'user-subscription-page',
    templateUrl: './user-subscription-page.component.html',
    styleUrls: ['./user-subscription-page.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserSubscriptionPageComponent implements OnInit {

    constructor(
        public vebtoConfig: VebtoConfig,
        private modal: Modal,
        private subscriptions: Subscriptions,
        private currentUser: CurrentUser,
    ) {}

    ngOnInit() {
    }

    /**
     * Ask user to confirm deletion of selected templates
     * and delete selected templates if user confirms.
     */
    public maybeCancelSubscription() {
        this.modal.open(ConfirmModalComponent, {
            title: 'Cancel Subscription',
            body:  'Are you sure you want to cancel your subscription?',
            ok:    'Yes, Cancel',
            cancel: 'Go Back'
        }).afterClosed().subscribe(confirmed => {
            if ( ! confirmed) return;
            this.subscriptions.cancel(this.currentUser.get('subscriptions')[0].id).subscribe(response => {
                console.log(response);
            });
        });
    }

    public resumeSubscription() {
        this.subscriptions.resume(this.currentUser.get('subscriptions')[0].id).subscribe(response => {
            console.log(response);
        })
    }
}
