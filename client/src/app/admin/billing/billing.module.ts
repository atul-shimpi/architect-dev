import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {UiModule} from "../../../../node_modules/vebto-client/core/ui/ui.module";
import {Plans} from "./plans/plans.service";
import {CrupdatePlanModalComponent} from "./plans/crupdate-plan-modal/crupdate-plan-modal.component";
import {PlansListComponent} from "./plans/plans-list/plans-list.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
    MatButtonModule,
    MatCheckboxModule, MatChipsModule, MatDialogModule, MatPaginatorModule, MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule
} from "@angular/material";
import {PermissionsManagerPanelComponent} from "../../permissions-manager-panel/permissions-manager-panel.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UiModule,

        //material
        MatButtonModule,
        MatSnackBarModule,
        MatTableModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatSortModule,
        MatTooltipModule,
        MatDialogModule,
        MatChipsModule,
    ],
    declarations: [
        PlansListComponent,
        CrupdatePlanModalComponent,
        PermissionsManagerPanelComponent,
    ],
    entryComponents: [
        CrupdatePlanModalComponent,
    ],
    providers: [
        Plans,
    ]
})
export class BillingModule {
}
