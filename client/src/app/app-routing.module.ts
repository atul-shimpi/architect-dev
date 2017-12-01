import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "vebto-client/guards/auth-guard.service";
import {ProjectsResolver} from "./dashboard/projects-resolver.service";

const routes: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'builder', loadChildren: 'app/html-builder/html-builder.module#HtmlBuilderModule'},
    {path: 'dashboard', component: DashboardComponent, resolve: {projects: ProjectsResolver}}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
