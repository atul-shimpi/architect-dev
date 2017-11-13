import {
    MatAutocompleteModule,
    MatButtonModule, MatCheckboxModule, MatChipsModule, MatDialogModule, MatExpansionModule, MatRadioGroup,
    MatRadioGroupBase,
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
        MatAutocompleteModule,
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
        MatAutocompleteModule,
        MatDialogModule,
        MatRadioModule,
    ],
})
export class MaterialModule { }