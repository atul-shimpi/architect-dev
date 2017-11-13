import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CoreModule} from "vebto-client/core";
import {Modal} from "./shared/modal.service";
import {MaterialModule} from "./shared/material.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CoreModule.forRoot(),
        MaterialModule
    ],
    providers: [
        Modal,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
