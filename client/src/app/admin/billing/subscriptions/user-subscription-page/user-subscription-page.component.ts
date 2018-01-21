import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {VebtoConfig} from "../../../../../../node_modules/vebto-client/core/vebto-config.service";
import {ConfirmModalComponent} from "../../../../../../node_modules/vebto-client/core/ui/confirm-modal/confirm-modal.component";
import {Modal} from "../../../../../../node_modules/vebto-client/core/ui/modal.service";

@Component({
    selector: 'user-subscription-page',
    templateUrl: './user-subscription-page.component.html',
    styleUrls: ['./user-subscription-page.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserSubscriptionPageComponent implements OnInit {

    constructor(public vebtoConfig: VebtoConfig, private modal: Modal) {
    }

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
           //
        });
    }

}
