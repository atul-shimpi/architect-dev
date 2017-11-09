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
import {MaterialModule} from "../../shared/material.module";
import { BorderStyleControlsComponent } from './inspector/inspector-panel/border-style-controls/border-style-controls.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { SideControlBorderComponent } from './inspector/inspector-panel/spacing-panel/side-control-border/side-control-border.component';
import { TextStylePanelComponent } from './inspector/inspector-panel/text-style-panel/text-style-panel.component';

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
        TextStylePanelComponent
    ],
    providers: [
        LivePreview,
        Templates,
        Elements,
        Inspector,
        UndoManager,
    ]
})
export class HtmlBuilderModule {
}
