import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {LivePreview} from "../live-preview.service";
import {DragVisualHelperComponent} from "./drag-and-drop/drag-visual-helper/drag-visual-helper.component";
import {ContextBoxes} from "./context-boxes.service";
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
        private contextBoxes: ContextBoxes,
    ) {}

    ngOnInit() {
        this.contextBoxes.set(this.hoverBox.el.nativeElement, this.selectedBox.el.nativeElement);
        this.livePreview.init(this.dragHelper, this.iframe);
    }
}
