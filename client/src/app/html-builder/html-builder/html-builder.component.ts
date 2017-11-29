import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Templates} from "../../templates/templates.service";
import {LivePreview} from "../live-preview.service";
import {Elements} from "../elements/elements.service";
import {ActivatedRoute} from "@angular/router";
import {Projects} from "../projects/projects.service";
import {ParsedProject} from "../projects/parsed-project";

@Component({
    selector: 'html-builder',
    templateUrl: './html-builder.component.html',
    styleUrls: ['./html-builder.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class HtmlBuilderComponent implements OnInit {

    constructor(
        private projects: Projects,
        private project: ParsedProject,
        private elements: Elements,
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.elements.init(this.route.snapshot.data['customElements']);

        this.projects.all().subscribe(projects => {
            this.project.setProject(projects[0]);
        });
    }
}
