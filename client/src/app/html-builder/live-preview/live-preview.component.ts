import {Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import {LivePreview} from "../live-preview.service";
import {DragVisualHelperComponent} from "./drag-and-drop/drag-visual-helper/drag-visual-helper.component";
import {BuilderDocument} from "../builder-document.service";
import {LivePreviewDocument} from "./live-preview-document.service";
import {BuilderDocumentActions} from "../builder-document-actions.service";
import {SelectedElement} from "./selected-element.service";
import {Inspector} from "../inspector/inspector.service";
import {InspectorFloatingPanel} from "../inspector/inspector-floating-panel.service";
import {UploadFileModalComponent} from "vebto-client/core/index";
import {Modal} from "vebto-client/core/ui/modal.service";
import {ActiveProject} from "../projects/active-project";
import {ContextBoxes} from "./context-boxes.service";
import {InlineTextEditor} from "./inline-text-editor/inline-text-editor.service";
import {ContextBoxComponent} from "./context-box/context-box.component";

@Component({
    selector: 'live-preview',
    templateUrl: './live-preview.component.html',
    styleUrls: ['./live-preview.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LivePreviewComponent implements OnInit {
    @ViewChild('iframe') iframe: ElementRef;
    @ViewChild('hoverBox') hoverBox: ContextBoxComponent;
    @ViewChild('selectedBox') selectedBox: ContextBoxComponent;
    @ViewChild('dragHelper') dragHelper: DragVisualHelperComponent;

    constructor(
        public livePreview: LivePreview,
        private previewDocument: LivePreviewDocument,
        private contextBoxes: ContextBoxes,
    ) {}

    ngOnInit() {
        this.previewDocument.init(this.iframe);
        this.contextBoxes.set(this.hoverBox.el.nativeElement, this.selectedBox.el.nativeElement);
        this.livePreview.init(this.dragHelper, this.iframe);
    }
}
