import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CoreModule} from "vebto-client/core";
import {AuthModule} from "vebto-client/auth/auth.module";
import {MaterialModule} from "./shared/material.module";
import {DashboardModule} from "./dashboard/dashboard/dashboard.module";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CoreModule.forRoot(),
        AuthModule,
        MaterialModule,
        DashboardModule,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
