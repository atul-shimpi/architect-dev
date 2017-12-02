import {Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import {LivePreview} from "../live-preview.service";
import {DragVisualHelperComponent} from "./drag-and-drop/drag-visual-helper/drag-visual-helper.component";
import {BuilderDocument} from "../builder-document.service";
import {LivePreviewDocument} from "./live-preview-document.service";

@Component({
    selector: 'live-preview',
    templateUrl: './live-preview.component.html',
    styleUrls: ['./live-preview.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LivePreviewComponent implements OnInit {
    @ViewChild('iframe') iframe: ElementRef;
    @ViewChild('hoverBox') hoverBox: ElementRef;
    @ViewChild('selectedBox') selectedBox: ElementRef;
    @ViewChild('dragHelper') dragHelper: DragVisualHelperComponent;

    constructor(
        public livePreview: LivePreview,
        private previewDocument: LivePreviewDocument,
        private el: ElementRef,
    ) {}

    ngOnInit() {
        this.previewDocument.init(this.iframe);

        this.livePreview.init(
            this.hoverBox,
            this.selectedBox,
            this.dragHelper,
        );
    }
}
