import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewProjectModalComponent} from "../new-project-page/new-project-modal/new-project-modal.component";
import {NewProjectPageComponent} from "../new-project-page/new-project-page.component";
import {DashboardComponent} from "../dashboard.component";
import {DashboardNavbarComponent} from "../dashboard-navbar/dashboard-navbar.component";
import {MaterialModule} from "../../shared/material.module";
import {TemplatesResolver} from "../new-project-page/templates-resolver.service";
import {Templates} from "../../templates/templates.service";
import {ProjectBaseUrl} from "../../html-builder/projects/project-base-url.service";
import {Projects} from "../../html-builder/projects/projects.service";
import {ProjectsResolver} from "../projects-resolver.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CoreModule} from "vebto-client/core/core.module";
import {DashboardRoutingModule} from "../dashboard-routing.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        CoreModule,
        DashboardRoutingModule,
    ],
    declarations: [
        DashboardComponent,
        NewProjectPageComponent,
        DashboardNavbarComponent,
        NewProjectModalComponent
    ],
    entryComponents: [
        NewProjectModalComponent,
    ],
    providers: [
        Projects,
        Templates,
        ProjectsResolver,
        TemplatesResolver,
        ProjectBaseUrl,
    ],
})
export class DashboardModule {
}
