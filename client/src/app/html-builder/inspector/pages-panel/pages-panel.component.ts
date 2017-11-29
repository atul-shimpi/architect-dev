import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ParsedProject} from "../../projects/parsed-project";
import {Page} from "../../../../types/models/Page";
import {Projects} from "../../projects/projects.service";

@Component({
    selector: 'pages-panel',
    templateUrl: './pages-panel.component.html',
    styleUrls: ['./pages-panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PagesPanelComponent implements OnInit {

    public selectedPage: Page;

    constructor(
        public activeProject: ParsedProject,
        private projects: Projects
    ) {}

    ngOnInit() {
        this.selectedPage = this.activeProject.getPages()[0];
        console.log(this.activeProject.getPages());
    }

    public createNewPage() {
        const name = 'Page '+(this.activeProject.getPages().length + 1);

        this.projects.createPage(this.activeProject.get().id, {name}).subscribe(response => {
            this.activeProject.addPage(response.page);
        });
    }
}
