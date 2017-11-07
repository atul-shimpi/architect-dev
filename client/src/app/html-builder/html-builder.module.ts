import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HtmlBuilderComponent} from './html-builder/html-builder.component';
import {HtmlBuilderRoutingModule} from "./html-builder-routing.module";
import { InspectorComponent } from './inspector/inspector.component';
import { LivePreviewComponent } from './live-preview/live-preview.component';
import {LivePreview} from "./live-preview.service";
import {Templates} from "../templates/templates.service";
import {
    MatChipsModule, MatExpansionModule, MatIconModule, MatInputModule, MatSliderModule,
    MatTooltipModule
} from "@angular/material";
import {PreviewDragAndDropDirective} from './live-preview/drag-and-drop/preview-drag-and-drop.directive';
import {Elements} from "./elements/elements.service";
import { ElementsPanelComponent } from './inspector/elements-panel/elements-panel.component';
import {CoreModule} from "vebto-client/core";
import {Inspector} from "./inspector/inspector.service";
import {UndoManager} from "./undo-manager/undo-manager.service";
import { InspectorPanelComponent } from './inspector/inspector-panel/inspector-panel.component';
import { AttributesPanelComponent } from './inspector/inspector-panel/attributes-panel/attributes-panel.component';
import { SpacingPanelComponent } from './inspector/inspector-panel/spacing-panel/spacing-panel.component';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        HtmlBuilderRoutingModule,

        //material
        MatExpansionModule,
        MatTooltipModule,
        MatChipsModule,
        MatSliderModule,
    ],
    declarations: [
        HtmlBuilderComponent,
        InspectorComponent,
        LivePreviewComponent,
        PreviewDragAndDropDirective,
        ElementsPanelComponent,
        InspectorPanelComponent,
        AttributesPanelComponent,
        SpacingPanelComponent
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
