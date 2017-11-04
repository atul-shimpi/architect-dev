import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule, MatCheckboxModule, MatExpansionModule, MatIconModule} from '@angular/material';
import {CoreModule} from "vebto-client/core";
import {HttpModule} from "@angular/http";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CoreModule.forRoot(),

        //material
        MatButtonModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatIconModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
