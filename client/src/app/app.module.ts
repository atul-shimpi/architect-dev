import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CoreModule} from "vebto-client/core";
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthModule} from "vebto-client/auth/auth.module";
import {ProjectsResolver} from "./dashboard/projects-resolver.service";
import {Projects} from "./html-builder/projects/projects.service";
import {MaterialModule} from "./shared/material.module";
import { NewProjectPageComponent } from './dashboard/new-project-page/new-project-page.component';
import {TemplatesResolver} from "./dashboard/new-project-page/templates-resolver.service";
import {Templates} from "./templates/templates.service";
import { DashboardNavbarComponent } from './dashboard/dashboard-navbar/dashboard-navbar.component';
import { NewProjectModalComponent } from './dashboard/new-project-page/new-project-modal/new-project-modal.component';
import {ProjectBaseUrl} from "./html-builder/projects/project-base-url.service";

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        NewProjectPageComponent,
        DashboardNavbarComponent,
        NewProjectModalComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CoreModule.forRoot(),
        AuthModule,
        MaterialModule,
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
    bootstrap: [AppComponent]
})
export class AppModule {
}
