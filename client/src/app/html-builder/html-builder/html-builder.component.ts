import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Elements} from "../elements/elements.service";
import {ActivatedRoute} from "@angular/router";
import {ActiveProject} from "../projects/active-project";

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
        private activeProject: ActiveProject,
    ) {}

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.activeProject.setProject(data.project);
            this.elements.init(data.customElements);
        });
    }
}
