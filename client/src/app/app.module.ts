import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CoreModule} from "vebto-client/core";
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthModule} from "vebto-client/auth/auth.module";
import {RouterModule} from "@angular/router";
import {ProjectsResolver} from "./dashboard/projects-resolver.service";
import {Projects} from "./html-builder/projects/projects.service";
import {MaterialModule} from "./shared/material.module";

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CoreModule.forRoot(),
        AuthModule,
        MaterialModule,
    ],
    providers: [
        Projects,
        ProjectsResolver,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
