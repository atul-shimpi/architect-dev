import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "vebto-client/guards/auth-guard.service";
import {ProjectsResolver} from "./dashboard/projects-resolver.service";
import {NewProjectPageComponent} from "./dashboard/new-project-page/new-project-page.component";
import {TemplatesResolver} from "./dashboard/new-project-page/templates-resolver.service";

const routes: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'builder', loadChildren: 'app/html-builder/html-builder.module#HtmlBuilderModule'},
    {path: 'dashboard', component: DashboardComponent, resolve: {projects: ProjectsResolver}},
    {path: 'dashboard/projects', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard/projects/new', component: NewProjectPageComponent, resolve: {templates: TemplatesResolver}},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
