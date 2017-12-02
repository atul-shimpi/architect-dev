import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Elements} from "../elements/elements.service";
import {ActivatedRoute} from "@angular/router";
import {ParsedProject} from "../projects/parsed-project";
import {BuilderDocument} from "../builder-document.service";

@Component({
    selector: 'html-builder',
    templateUrl: './html-builder.component.html',
    styleUrls: ['./html-builder.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class HtmlBuilderComponent implements OnInit {

    /**
     * HtmlBuilderComponent Constructor.
     */
    constructor(
        private elements: Elements,
        private route: ActivatedRoute,
        private activeProject: ParsedProject,
    ) {}

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.activeProject.setProject(data.project);
            this.elements.init(data.customElements);
        });
    }
}
