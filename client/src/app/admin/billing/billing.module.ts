import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {UiModule} from "../../../../node_modules/vebto-client/core/ui/ui.module";
import {Plans} from "./plans/plans.service";
import {CrupdatePlanModalComponent} from "./plans/crupdate-plan-modal/crupdate-plan-modal.component";
import {PlansListComponent} from "./plans/plans-list/plans-list.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminModule} from "vebto-client/admin/admin.module";
import {
    MatButtonModule, MatCheckboxModule, MatChipsModule, MatDialogModule, MatListModule, MatPaginatorModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatTooltipModule
} from "@angular/material";
import {Subscriptions} from "./subscriptions/subscriptions.service";
import {UpgradePageComponent} from "./upgrade-page/upgrade-page.component";
import {BillingPlansResolver} from "./upgrade-page/billing-plans-resolver.service";
import {BillingRoutingModule} from "./billing-routing.module";
import {ReorderPlanFeaturesDirective} from "./plans/crupdate-plan-modal/reorder-plan-features.directive";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UiModule,
        BillingRoutingModule,

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
        MatStepperModule,
        MatProgressBarModule,
        MatTabsModule,
    ],
    declarations: [
        PlansListComponent,
        CrupdatePlanModalComponent,
        UpgradePageComponent,
        ReorderPlanFeaturesDirective,
    ],
    entryComponents: [
        CrupdatePlanModalComponent,
    ],
    providers: [
        Plans,
        Subscriptions,
        BillingPlansResolver,
    ],
    exports: [
        BillingRoutingModule,
    ]
})
export class BillingModule {
}
