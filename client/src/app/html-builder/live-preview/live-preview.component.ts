import {Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import {LivePreview} from "../live-preview.service";
import {DragVisualHelperComponent} from "./drag-and-drop/drag-visual-helper/drag-visual-helper.component";

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
        private renderer: Renderer2,
        private el: ElementRef,
    ) {}

    ngOnInit() {
        this.livePreview.init(
            this.renderer,
            this.iframe,
            this.el,
            this.hoverBox,
            this.selectedBox,
            this.dragHelper,
        );
    }
}
