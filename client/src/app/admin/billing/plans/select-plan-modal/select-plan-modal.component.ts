import {Component, ViewEncapsulation} from '@angular/core';
import {ConfirmModalComponent} from "vebto-client/core/ui/confirm-modal/confirm-modal.component";
import {MatDialogRef} from "@angular/material";
import {Plan} from "../plan";

@Component({
    selector: 'select-plan-modal',
    templateUrl: './select-plan-modal.component.html',
    styleUrls: ['./select-plan-modal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SelectPlanModalComponent {

    /**
     * SelectPlanModalComponent Constructor.
     */
    constructor(private dialogRef: MatDialogRef<ConfirmModalComponent>) {}

    /**
     * Close the modal.
     */
    public close(plan: Plan) {
        this.dialogRef.close(plan);
    }
}
