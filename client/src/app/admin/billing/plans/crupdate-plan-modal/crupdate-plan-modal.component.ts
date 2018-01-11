import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Plans} from "../plans.service";
import {Plan} from "../plan";
import {Toast} from "vebto-client/core/ui/toast.service";

@Component({
    selector: 'crupdate-plan-modal',
    templateUrl: './crupdate-plan-modal.component.html',
    styleUrls: ['./crupdate-plan-modal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CrupdatePlanModalComponent implements OnInit {

    /**
     * Whether plan is currently being saved.
     */
    public loading: boolean = false;

    /**
     * Plan model.
     */
    public model: Plan;

    /**
     * If we are updating existing plan or creating a new one.
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
        private dialogRef: MatDialogRef<CrupdatePlanModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {plan?: Plan},
        public plans: Plans,
        private toast: Toast,
    ) {
        this.resetState();
    }

    ngOnInit() {
        this.resetState();

        if (this.data.plan) {
            this.updating = true;
            this.hydrateModel(this.data.plan);
        } else {
            this.updating = false;
        }
    }

    /**
     * Create a new plan or update existing one.
     */
    public confirm() {
        this.loading = true;
        let request;

        if (this.updating) {
            request = this.plans.update(this.data.plan.id, this.model);
        } else {
            request = this.plans.create(this.model);
        }

        request.subscribe(response => {
            this.close(response.plan);
            let action = this.updating ? 'updated' : 'created';
            this.toast.open('Plan has been '+action);
            this.loading = false;
        }, response => {
            this.errors = response.messages;
            this.loading = false;
        });
    }

    /**
     * Close the modal.
     */
    public close(data?: any) {
        this.resetState();
        this.dialogRef.close(data);
    }

    /**
     * Populate plan model with given data.
     */
    private hydrateModel(plan: Plan) {
        this.model.name = plan.name;
        this.model.amount = plan.amount;
        this.model.currency = plan.currency;
        this.model.interval = plan.interval;
    }

    /**
     * Reset all modal state to default.
     */
    private resetState() {
        this.model = new Plan();
        this.errors = {};
    }
}
