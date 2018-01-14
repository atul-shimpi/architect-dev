import {Route, RouterModule} from "@angular/router";
import {UpgradePageComponent} from "./upgrade-page/upgrade-page.component";
import {NgModule} from "@angular/core";
import {BillingPlansResolver} from "./upgrade-page/billing-plans-resolver.service";

export const routes: Route[] = [
    {path: 'billing/upgrade', component: UpgradePageComponent, resolve: {plans: BillingPlansResolver}},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BillingRoutingModule {}