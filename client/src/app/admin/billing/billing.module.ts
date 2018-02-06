import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {UiModule} from "vebto-client/core/ui/ui.module";
import {Plans} from "./plans/plans.service";
import {CrupdatePlanModalComponent} from "./plans/crupdate-plan-modal/crupdate-plan-modal.component";
import {PlansListComponent} from "./plans/plans-list/plans-list.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminModule} from "vebto-client/admin/admin.module";
import {
    MAT_DATE_FORMATS, MatAutocompleteModule,
    MatButtonModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
    MatDialogModule, MatListModule,
    MatPaginatorModule,
    MatProgressBarModule, MatRadioModule,
    MatSnackBarModule,
    MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatTooltipModule,
} from "@angular/material";
import {Subscriptions} from "./subscriptions/subscriptions.service";
import {UpgradePageComponent} from "./upgrade-page/upgrade-page.component";
import {BillingPlansResolver} from "./upgrade-page/billing-plans-resolver.service";
import {BillingRoutingModule} from "./billing-routing.module";
import {ReorderPlanFeaturesDirective} from "./plans/crupdate-plan-modal/reorder-plan-features.directive";
import { PlanFeaturesListComponent } from './upgrade-page/plan-features-list/plan-features-list.component';
import { OrderSummaryComponent } from './upgrade-page/order-summary/order-summary.component';
import { AcceptedPaymentsHeaderComponent } from './upgrade-page/accepted-payments-header/accepted-payments-header.component';
import { UserSubscriptionPageComponent } from './subscriptions/user-subscription-page/user-subscription-page.component';
import { UpgradePageAsideComponent } from './upgrade-page/upgrade-page-aside/upgrade-page-aside.component';
import {CurrenciesListResolver} from "./upgrade-page/currencies-list-resolver.service";
import { CreditCardFormComponent } from './credit-card-form/credit-card-form.component';
import {PaypalSubscriptions} from "./subscriptions/paypal-subscriptions";
import { SelectPlanModalComponent } from './plans/select-plan-modal/select-plan-modal.component';
import {SelectPlanPanelComponent} from "./plans/select-plan-panel/select-plan-panel.component";
import {SelectPlanPeriodPanelComponent} from "./plans/select-plan-period-panel/select-plan-period-panel.component";
import {SubscriptionStepperState} from "./subscriptions/subscription-stepper-state.service";
import {UserNotSubscribedGuard} from "./guards/user-not-subscribed-guard.service";
import {BillingEnabledGuard} from "./guards/billing-enabled-guard.service";
import {UserSubscribedGuard} from "./guards/user-subscribed-guard.service";
import {SubscriptionsListComponent} from "./subscriptions/subscriptions-list/subscriptions-list.component";
import {CreateSubscriptionPanelComponent} from "./subscriptions/create-subscription-panel/create-subscription-panel.component";
import { FullPlanNameComponent } from './plans/full-plan-name/full-plan-name.component';
import {CrupdateSubscriptionModalComponent} from "./subscriptions/crupdate-subscription-modal/crupdate-subscription-modal.component";
import {MomentDateModule} from "@angular/material-moment-adapter";

export const MY_FORMATS = {
    display: {
        dateInput: 'YYYY-MM-DD',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

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
        MatCheckboxModule,
        MatTooltipModule,
        MatDialogModule,
        MatListModule,
        MatStepperModule,
        MatProgressBarModule,
        MatTabsModule,
        MatRadioModule,

        //admin material
        MatDatepickerModule,
        MomentDateModule,
        MatSortModule,
        MatChipsModule,
        MatPaginatorModule,
        MatTableModule,
        MatAutocompleteModule,
    ],
    declarations: [
        PlansListComponent,
        SubscriptionsListComponent,
        CrupdatePlanModalComponent,
        UpgradePageComponent,
        ReorderPlanFeaturesDirective,
        PlanFeaturesListComponent,
        OrderSummaryComponent,
        AcceptedPaymentsHeaderComponent,
        UserSubscriptionPageComponent,
        UpgradePageAsideComponent,
        CreditCardFormComponent,
        CreateSubscriptionPanelComponent,
        SelectPlanPanelComponent,
        SelectPlanModalComponent,
        SelectPlanPeriodPanelComponent,
        FullPlanNameComponent,
        CrupdateSubscriptionModalComponent,
    ],
    entryComponents: [
        CrupdatePlanModalComponent,
        CrupdateSubscriptionModalComponent,
        SelectPlanModalComponent,
    ],
    providers: [
        Plans,
        Subscriptions,
        BillingPlansResolver,
        CurrenciesListResolver,
        PaypalSubscriptions,
        SubscriptionStepperState,
        UserNotSubscribedGuard,
        BillingEnabledGuard,
        UserSubscribedGuard,
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
    exports: [
        BillingRoutingModule,
    ]
})
export class BillingModule {
}
