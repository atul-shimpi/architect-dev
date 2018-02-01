import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {UiModule} from "vebto-client/core/ui/ui.module";
import {Plans} from "./plans/plans.service";
import {CrupdatePlanModalComponent} from "./plans/crupdate-plan-modal/crupdate-plan-modal.component";
import {PlansListComponent} from "./plans/plans-list/plans-list.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminModule} from "vebto-client/admin/admin.module";
import {
    MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDialogModule, MatListModule,
    MatPaginatorModule,
    MatProgressBarModule, MatRadioModule,
    MatSnackBarModule,
    MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatTooltipModule
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
import {BillingFormatter} from "./billing-formatter.service";
import { CreditCardFormComponent } from './credit-card-form/credit-card-form.component';
import {PaypalSubscriptions} from "./subscriptions/paypal-subscriptions";
import { CreateSubscriptionTabsComponent } from './subscriptions/create-subscription-tabs/create-subscription-tabs.component';
import { SelectPlanModalComponent } from './plans/select-plan-modal/select-plan-modal.component';
import {SelectPlanPanelComponent} from "./plans/select-plan-panel/select-plan-panel.component";
import {SelectPlanPeriodPanelComponent} from "./plans/select-plan-period-panel/select-plan-period-panel.component";
import {SubscriptionPaymentPanelComponent} from "./subscriptions/subscriptions-steps/subscription-payment-panel/subscription-payment-panel.component";
import {SubscriptionStepperState} from "./subscriptions/subscription-stepper-state.service";
import {UserNotSubscribedGuard} from "./guards/user-not-subscribed-guard.service";
import {BillingEnabledGuard} from "./guards/billing-enabled-guard.service";
import {UserSubscribedGuard} from "./guards/user-subscribed-guard.service";
import {SubscriptionsListComponent} from "./subscriptions/subscriptions-list/subscriptions-list.component";

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
        MatCardModule,
        MatRadioModule,
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
        CreateSubscriptionTabsComponent,
        SelectPlanPanelComponent,
        SelectPlanModalComponent,
        SelectPlanPeriodPanelComponent,
        SubscriptionPaymentPanelComponent,
    ],
    entryComponents: [
        CrupdatePlanModalComponent,
        SelectPlanModalComponent,
    ],
    providers: [
        Plans,
        Subscriptions,
        BillingPlansResolver,
        CurrenciesListResolver,
        BillingFormatter,
        PaypalSubscriptions,
        SubscriptionStepperState,
        UserNotSubscribedGuard,
        BillingEnabledGuard,
        UserSubscribedGuard,
    ],
    exports: [
        BillingRoutingModule,
    ]
})
export class BillingModule {
}
