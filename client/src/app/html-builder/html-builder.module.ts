import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HtmlBuilderComponent} from './html-builder/html-builder.component';
import {HtmlBuilderRoutingModule} from "./html-builder-routing.module";
import { InspectorComponent } from './inspector/inspector.component';
import { LivePreviewComponent } from './live-preview/live-preview.component';
import {LivePreview} from "./live-preview.service";
import {Templates} from "../templates/templates.service";
import {MatExpansionModule, MatTooltipModule} from "@angular/material";
import {PreviewDragAndDropDirective} from './live-preview/drag-and-drop/preview-drag-and-drop.directive';
import {Elements} from "./elements/elements.service";
import { ElementsPanelComponent } from './inspector/elements-panel/elements-panel.component';
import {CoreModule} from "vebto-client/core";
import {Inspector} from "./inspector/inspector.service";

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        HtmlBuilderRoutingModule,

        //material
        MatExpansionModule,
        MatTooltipModule,
    ],
    declarations: [
        HtmlBuilderComponent,
        InspectorComponent,
        LivePreviewComponent,
        PreviewDragAndDropDirective,
        ElementsPanelComponent
    ],
    providers: [
        LivePreview,
        Templates,
        Elements,
        Inspector,
    ]
})
export class HtmlBuilderModule {
}
