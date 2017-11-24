import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Templates} from "../../templates/templates.service";
import {LivePreview} from "../live-preview.service";
import {Elements} from "../elements/elements.service";
import {ActivatedRoute} from "@angular/router";

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
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.elements.init(this.route.snapshot.data['customElements']);

        this.templates.all().subscribe(templates => {
            this.livePreview.applyTemplate(templates[0]);
        });
    }
}
