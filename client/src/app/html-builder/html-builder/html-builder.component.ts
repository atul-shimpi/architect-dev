import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Elements} from "../elements/elements.service";
import {ActivatedRoute} from "@angular/router";
import {ActiveProject} from "../projects/active-project";
import {MatDrawer} from "@angular/material";
import {InspectorDrawer} from "../inspector/inspector-drawer.service";

@Component({
    selector: 'html-builder',
    templateUrl: './html-builder.component.html',
    styleUrls: ['./html-builder.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class HtmlBuilderComponent implements OnInit {
    @ViewChild('inspectorDrawer') drawer: MatDrawer;

    /**
     * HtmlBuilderComponent Constructor.
     */
    constructor(
        private elements: Elements,
        private route: ActivatedRoute,
        private activeProject: ActiveProject,
        public inspectorDrawer: InspectorDrawer,
    ) {}

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.activeProject.setProject(data.project);
            this.elements.init(data.customElements);
            this.inspectorDrawer.setDrawer(this.drawer);
        });
    }

    public getInspectorDrawerPanel(): string {
        return this.inspectorDrawer.activePanel;
    }
}
