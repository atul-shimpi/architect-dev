import {
    MatButtonModule, MatCheckboxModule, MatChipsModule, MatDialogModule, MatExpansionModule,
    MatRadioModule,
    MatSliderModule,
    MatTooltipModule
} from '@angular/material';
import {NgModule} from "@angular/core";
import {PortalModule} from "@angular/cdk/portal";
import {OverlayModule} from "@angular/cdk/overlay";

@NgModule({
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatSliderModule,
        MatTooltipModule,
        MatChipsModule,
        PortalModule,
        OverlayModule,
        MatDialogModule,
        MatRadioModule,
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatSliderModule,
        MatTooltipModule,
        MatChipsModule,
        PortalModule,
        OverlayModule,
        MatDialogModule,
        MatRadioModule,
    ],
})
export class MaterialModule { }