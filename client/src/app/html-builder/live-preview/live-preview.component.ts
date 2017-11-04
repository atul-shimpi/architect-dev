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

    constructor(
        private http: AppHttpClient,
        private livePreview: LivePreview,
        private renderer: Renderer2,
        private el: ElementRef,
    ) {}

    ngOnInit() {
        this.livePreview.init(this.renderer, this.iframe, this.el, this.hoverBox);
    }
}
