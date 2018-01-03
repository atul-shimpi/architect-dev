import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TemplatesComponent} from "./templates/templates.component";
import {AuthGuard} from "../../../node_modules/vebto-client/guards/auth-guard.service";
import {CheckPermissionsGuard} from "../../../node_modules/vebto-client/guards/check-permissions-guard.service";
import {AdminComponent} from "../../../node_modules/vebto-client/admin/admin.component";
import {ProjectsComponent} from "./projects/projects.component";

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
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppAdminRoutingModule {
}
