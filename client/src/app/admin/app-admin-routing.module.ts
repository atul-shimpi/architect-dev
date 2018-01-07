import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TemplatesComponent} from "./templates/templates.component";
import {AuthGuard} from "../../../node_modules/vebto-client/guards/auth-guard.service";
import {CheckPermissionsGuard} from "../../../node_modules/vebto-client/guards/check-permissions-guard.service";
import {AdminComponent} from "../../../node_modules/vebto-client/admin/admin.component";
import {ProjectsComponent} from "./projects/projects.component";
import {BuilderSettingsComponent} from "./settings/builder/builder-settings.component";
import {SettingsComponent} from "../../../node_modules/vebto-client/admin/settings/settings.component";
import {SettingsResolve} from "../../../node_modules/vebto-client/admin/settings/settings-resolve.service";
import {vebtoSettingsRoutes} from "../../../node_modules/vebto-client/admin/settings/settings-routing.module";
import {vebtoAdminRoutes} from "../../../node_modules/vebto-client/admin/admin-routing.module";

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
                    ...vebtoSettingsRoutes,
                ],
            },
            ...vebtoAdminRoutes,
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppAdminRoutingModule {
}
