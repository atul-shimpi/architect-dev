import {Route, RouterModule} from "@angular/router";
import {UpgradePageComponent} from "./upgrade-page/upgrade-page.component";
import {NgModule} from "@angular/core";
import {BillingPlansResolver} from "./upgrade-page/billing-plans-resolver.service";
import {AuthGuard} from "vebto-client/guards/auth-guard.service";
import {UserSubscriptionPageComponent} from "./subscriptions/user-subscription-page/user-subscription-page.component";
import {CurrenciesListResolver} from "./upgrade-page/currencies-list-resolver.service";

export const routes: Route[] = [
    {path: 'billing/upgrade', component: UpgradePageComponent, resolve: {plans: BillingPlansResolver, currencies: CurrenciesListResolver}},

    {
        path: 'account/settings/subscription',
        component: UserSubscriptionPageComponent,
        resolve: {plans: BillingPlansResolver},
        canActivate: [AuthGuard],
        data: {name: 'account-settings-subscription'},
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BillingRoutingModule {}