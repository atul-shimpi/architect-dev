import {Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import {LivePreview} from "../live-preview.service";
import {DragVisualHelperComponent} from "./drag-and-drop/drag-visual-helper/drag-visual-helper.component";
import {BuilderDocument} from "../builder-document.service";

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
        private el: ElementRef,
        private document: BuilderDocument,
    ) {}

    ngOnInit() {
        this.document.init(this.iframe);

        this.livePreview.init(
            this.el,
            this.hoverBox,
            this.selectedBox,
            this.dragHelper,
        );
    }
}
