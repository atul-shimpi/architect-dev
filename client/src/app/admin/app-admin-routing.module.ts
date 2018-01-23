import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TemplatesComponent} from "./templates/templates.component";
import {AuthGuard} from "vebto-client/guards/auth-guard.service";
import {CheckPermissionsGuard} from "vebto-client/guards/check-permissions-guard.service";
import {AdminComponent} from "vebto-client/admin/admin.component";
import {ProjectsComponent} from "./projects/projects.component";
import {BuilderSettingsComponent} from "./settings/builder/builder-settings.component";
import {SettingsComponent} from "vebto-client/admin/settings/settings.component";
import {SettingsResolve} from "vebto-client/admin/settings/settings-resolve.service";
import {vebtoSettingsRoutes} from "vebto-client/admin/settings/settings-routing.module";
import {vebtoAdminRoutes} from "vebto-client/admin/admin-routing.module";
import {PlansListComponent} from "./billing/plans/plans-list/plans-list.component";
import {BillingSettingsComponent} from "./settings/billing/billing-settings.component";

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard, CheckPermissionsGuard],
        children: [
            {
                path: 'templates',
                component: TemplatesComponent,
                data: {permissions: ['templates.view']}
            },
            {
                path: 'projects',
                component: ProjectsComponent,
                data: {permissions: ['projects.view']}
            },
            {
                path: 'settings',
                component: SettingsComponent,
                resolve: {settings: SettingsResolve},
                data: {permissions: ['settings.view']},
                children: [
                    {
                        path: 'builder',
                        component: BuilderSettingsComponent,
                    },
                    {
                        path: 'billing',
                        component: BillingSettingsComponent,
                    },
                    ...vebtoSettingsRoutes,
                ],
            },
            ...vebtoAdminRoutes,

            //move billing routes to vebto-client admin module after they're done
            {
                path: 'plans',
                component: PlansListComponent,
                data: {permissions: ['plans.view']}
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppAdminRoutingModule {
}
