import {
    MatButtonModule, MatCheckboxModule, MatChipsModule, MatExpansionModule, MatSliderModule,
    MatTooltipModule
} from '@angular/material';
import {NgModule} from "@angular/core";

@NgModule({
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatSliderModule,
        MatTooltipModule,
        MatChipsModule,
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatSliderModule,
        MatTooltipModule,
        MatChipsModule,
    ],
})
export class MaterialModule { }