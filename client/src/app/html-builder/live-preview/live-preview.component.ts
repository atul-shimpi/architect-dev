import {Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import {AppHttpClient} from "vebto-client/core";
import {LivePreview} from "../live-preview.service";

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

    constructor(
        private http: AppHttpClient,
        public livePreview: LivePreview,
        private renderer: Renderer2,
        private el: ElementRef,
    ) {}

    ngOnInit() {
        this.livePreview.init(this.renderer, this.iframe, this.el, this.hoverBox, this.selectedBox);
    }

    public getElementDisplayName(type: 'hover'|'select') {
        const el = this.livePreview[type];
        if ( ! el || ! el.element) return;

        if (el.element.name === 'div container') {
            return el.node.classList[0];
        } else {
            return el.element.name;
        }
    }
}
