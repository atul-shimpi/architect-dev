import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {ConfirmModalComponent} from "vebto-client/core/ui/confirm-modal/confirm-modal.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Plan} from "../plan";
import {SubscriptionStepperState} from "../../subscriptions/subscription-stepper-state.service";
import {confirmModalData} from "../../../../../../node_modules/vebto-client/core/ui/confirm-modal/confirm-modal.component";

@Component({
    selector: 'select-plan-modal',
    templateUrl: './select-plan-modal.component.html',
    styleUrls: ['./select-plan-modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [SubscriptionStepperState],
})
export class SelectPlanModalComponent implements OnInit {

    /**
     * SelectPlanModalComponent Constructor.
     */
    constructor(
        private dialogRef: MatDialogRef<ConfirmModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {plans: Plan[]},
        private state: SubscriptionStepperState,
    ) {}

    ngOnInit() {
        this.state.setPlans(this.data.plans);
    }

    /**
     * Close the modal.
     */
    public close() {
        this.dialogRef.close(this.state.getFinalPlan());
    }
}
