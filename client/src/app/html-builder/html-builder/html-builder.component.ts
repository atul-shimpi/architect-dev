import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Templates} from "../../templates/templates.service";
import {LivePreview} from "../live-preview.service";
import {Elements} from "../elements/elements.service";

@Component({
    selector: 'html-builder',
    templateUrl: './html-builder.component.html',
    styleUrls: ['./html-builder.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class HtmlBuilderComponent implements OnInit {

    constructor(
        private templates: Templates,
        private livePreview: LivePreview,
        private elements: Elements,
    ) {}

    ngOnInit() {
        this.elements.init();

        this.templates.all().subscribe(templates => {
            this.livePreview.applyTemplate(templates[0]);
        });

    }



}
