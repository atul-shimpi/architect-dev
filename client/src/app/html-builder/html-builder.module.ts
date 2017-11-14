import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HtmlBuilderComponent} from './html-builder/html-builder.component';
import {HtmlBuilderRoutingModule} from "./html-builder-routing.module";
import { InspectorComponent } from './inspector/inspector.component';
import { LivePreviewComponent } from './live-preview/live-preview.component';
import {LivePreview} from "./live-preview.service";
import {Templates} from "../templates/templates.service";
import {PreviewDragAndDropDirective} from './live-preview/drag-and-drop/preview-drag-and-drop.directive';
import {Elements} from "./elements/elements.service";
import { ElementsPanelComponent } from './inspector/elements-panel/elements-panel.component';
import {CoreModule} from "vebto-client/core";
import {Inspector} from "./inspector/inspector.service";
import {UndoManager} from "./undo-manager/undo-manager.service";
import { InspectorPanelComponent } from './inspector/inspector-panel/inspector-panel.component';
import { AttributesPanelComponent } from './inspector/inspector-panel/attributes-panel/attributes-panel.component';
import { SpacingPanelComponent } from './inspector/inspector-panel/spacing-panel/spacing-panel.component';
import {MaterialModule} from "../shared/material.module";
import { BorderStyleControlsComponent } from './inspector/inspector-panel/border-style-controls/border-style-controls.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { SideControlBorderComponent } from './inspector/inspector-panel/spacing-panel/side-control-border/side-control-border.component';
import { TextStylePanelComponent } from './inspector/inspector-panel/text-style-panel/text-style-panel.component';
import { BackgroundPanelComponent } from './inspector/inspector-panel/background-panel/background-panel.component';
import { GradientBackgroundPanelComponent } from './inspector/inspector-panel/background-panel/gradient-background-panel/gradient-background-panel.component';
import {InspectorFloatingPanel} from "./inspector/inspector-floating-panel.service";
import { ColorpickerPanelComponent } from './inspector/inspector-panel/colorpicker-panel/colorpicker-panel.component';
import { GoogleFontsPanelComponent } from './inspector/inspector-panel/text-style-panel/google-fonts-panel/google-fonts-panel.component';
import { ImageBackgroundPanelComponent } from './inspector/inspector-panel/background-panel/image-background-panel/image-background-panel.component';
import { ShadowsPanelComponent } from './inspector/inspector-panel/shadows-panel/shadows-panel.component';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        HtmlBuilderRoutingModule,
        MaterialModule,
        ColorPickerModule,
    ],
    declarations: [
        HtmlBuilderComponent,
        InspectorComponent,
        LivePreviewComponent,
        PreviewDragAndDropDirective,
        ElementsPanelComponent,
        InspectorPanelComponent,
        AttributesPanelComponent,
        SpacingPanelComponent,
        BorderStyleControlsComponent,
        SideControlBorderComponent,
        TextStylePanelComponent,
        BackgroundPanelComponent,
        GradientBackgroundPanelComponent,
        ColorpickerPanelComponent,
        GoogleFontsPanelComponent,
        ImageBackgroundPanelComponent,
        ShadowsPanelComponent
    ],
    entryComponents: [
        GradientBackgroundPanelComponent,
        ColorpickerPanelComponent,
        GoogleFontsPanelComponent,
        ImageBackgroundPanelComponent,
    ],
    providers: [
        LivePreview,
        Templates,
        Elements,
        Inspector,
        UndoManager,
        InspectorFloatingPanel,
    ]
})
export class HtmlBuilderModule {
}
