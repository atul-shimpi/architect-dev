import {
    MatButtonModule, MatCheckboxModule, MatChipsModule, MatDialogModule, MatExpansionModule,
    MatRadioModule, MatSliderModule, MatTooltipModule, MatMenuModule, MatListModule, MatCardModule,
    MatProgressBarModule, MatTabsModule, MatSelectModule,
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
        MatMenuModule,
        MatListModule,
        MatCardModule,
        MatProgressBarModule,
        MatTabsModule,
        MatSelectModule,
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
        MatMenuModule,
        MatListModule,
        MatCardModule,
        MatProgressBarModule,
        MatTabsModule,
        MatSelectModule,
    ],
})
export class MaterialModule { }