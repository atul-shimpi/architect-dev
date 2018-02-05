import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDatepicker, MatDialogRef} from "@angular/material";
import {Subscriptions} from "../subscriptions.service";
import {Subscription} from "../subscription";
import {Toast} from "vebto-client/core/ui/toast.service";
import {utils} from "../../../../../../node_modules/vebto-client/core";

@Component({
    selector: 'crupdate-subscription-modal',
    templateUrl: './crupdate-subscription-modal.component.html',
    styleUrls: ['./crupdate-subscription-modal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CrupdateSubscriptionModalComponent implements OnInit {

    /**
     * Whether subscription is currently being saved.
     */
    public loading: boolean = false;

    /**
     * Subscription model.
     */
    public model: Subscription;

    /**
     * If we are updating existing subscription or creating a new one.
     */
    public updating: boolean = false;

    /**
     * Errors returned from backend.
     */
    public errors: any = {};

    /**
     * CrupdateUserModalComponent Constructor.
     */
    constructor(
        private dialogRef: MatDialogRef<CrupdateSubscriptionModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {subscription?: Subscription},
        public subscriptions: Subscriptions,
        private toast: Toast,
    ) {
        this.resetState();
    }

    ngOnInit() {
        this.resetState();

        if (this.data.subscription) {
            this.updating = true;
            this.hydrateModel(this.data.subscription);
        } else {
            this.updating = false;
        }
    }

    /**
     * Create a new subscription or update existing one.
     */
    public confirm() {
        this.loading = true;
        let request;

        if (this.updating) {
            request = this.subscriptions.update(this.data.subscription.id, this.getPayload());
        } else {
            request = this.subscriptions.create(this.getPayload());
        }

        request.subscribe(response => {
            this.close(response.subscription);
            let action = this.updating ? 'updated' : 'created';
            this.toast.open('Subscription has been '+action);
            this.loading = false;
        }, response => {
            this.errors = response.messages;
            this.loading = false;
        });
    }

    public getPayload() {
        let payload = Object.assign({}, this.model);

        //recombine date + time into a single date time string for backend
        payload.ends_at += ' ' + utils.splitDateTime(this.data.subscription.ends_at).time;
        payload.renews_at += ' ' + utils.splitDateTime(this.data.subscription.renews_at).time;
    }

    /**
     * Close the modal.
     */
    public close(data?: any) {
        this.resetState();
        this.dialogRef.close(data);
    }

    /**
     * Populate subscription model with given data.
     */
    private hydrateModel(subscription: Subscription) {
        this.model = Object.assign({}, subscription);

        //transform date time strings into just date, so date picker can handle them properly
        this.model.ends_at = utils.splitDateTime(this.model.ends_at).date;
        this.model.renews_at = utils.splitDateTime(this.model.renews_at).date;
    }

    /**
     * Reset all modal state to default.
     */
    private resetState() {
        this.model = new Subscription({currency: 'USD', interval: 'month', interval_count: 1, position: 1});
        this.errors = {};
    }

    /**
     * Toggle specified date picker's state between open and closed.
     */
    public toggleDatePicker(datePicker: MatDatepicker) {
        if (datePicker.opened) {
            datePicker.close();
        } else {
            datePicker.open();
        }
    }
}
