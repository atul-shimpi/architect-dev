import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {UiModule} from "../../../../node_modules/vebto-client/core/ui/ui.module";
import {Plans} from "./plans/plans.service";
import {CrupdatePlanModalComponent} from "./plans/crupdate-plan-modal/crupdate-plan-modal.component";
import {PlansListComponent} from "./plans/plans-list/plans-list.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminModule} from "vebto-client/admin/admin.module";
import { SelectPlanModalComponent } from './select-plan-modal/select-plan-modal.component';
import {
    MatButtonModule, MatCheckboxModule, MatChipsModule, MatDialogModule, MatListModule, MatPaginatorModule,
    MatSnackBarModule,
    MatSortModule, MatTableModule, MatTooltipModule
} from "@angular/material";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UiModule,

        //can remove this probably when migrated billing module to vebto-client
        AdminModule,

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
        MatListModule,
    ],
    declarations: [
        PlansListComponent,
        CrupdatePlanModalComponent,
        SelectPlanModalComponent,
    ],
    entryComponents: [
        CrupdatePlanModalComponent,
        SelectPlanModalComponent,
    ],
    providers: [
        Plans,
    ]
})
export class BillingModule {
}
