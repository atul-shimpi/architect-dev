import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ParsedProject} from "../../projects/parsed-project";
import {Page} from "../../../../types/models/Page";
import {Projects} from "../../projects/projects.service";
import {Toast} from "vebto-client/core";

@Component({
    selector: 'pages-panel',
    templateUrl: './pages-panel.component.html',
    styleUrls: ['./pages-panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PagesPanelComponent implements OnInit {

    /**
     * Currently selected page.
     */
    public selectedPage: Page;

    /**
     * Model for binding page update inputs.
     */
    public updateModel: {
        name?: string,
        title?: string,
        description?: string,
        tags?: string,
    } = {};

    /**
     * Errors returned from the backend.
     */
    public errors = {};

    /**
     * PagesPanelComponent Constructor.
     */
    constructor(
        public activeProject: ParsedProject,
        private projects: Projects,
        private toast: Toast,
    ) {}

    ngOnInit() {
        this.selectedPage = this.activeProject.getPages()[0];
    }

    public createNewPage() {
        let name = 'Page '+(this.activeProject.getPages().length + 1);

        if (this.activeProject.getPages().find(page => page.name === name)) {
            name += ' Copy';
        }

        this.projects.createPage(this.activeProject.get().id, {name}).subscribe(response => {
            this.activeProject.addPage(response.page);
            this.selectedPage = response.page;
            this.toast.open('Page created');
        });
    }

    /**
     * Check if selected page can be deleted.
     */
    public canDeleteSelectedPage() {
        return this.selectedPage && this.activeProject.getPages().length > 1;
    }

    /**
     * Called when selected page changes.
     */
    public onPageSelected() {
        this.updateModel = {
            name: this.selectedPage.name,
            title: this.selectedPage.title,
            description: this.selectedPage.description,
            tags: this.selectedPage.tags,
        };

        this.activeProject.setActivePage(this.selectedPage);
    }

    public updateSelectedPage() {
        this.projects.updatePage(this.activeProject.get().id, this.selectedPage.id, this.updateModel).subscribe(response => {
            this.toast.open('Page updated');
            this.selectedPage = response.page;
            this.activeProject.updatePage(response.page)
        }, errors => this.errors = errors.messages);
    }

    /**
     * Delete currently selected page.
     */
    public deleteSelectedPage() {
        this.projects.deletePage(this.activeProject.get().id, this.selectedPage.id).subscribe(() => {
            this.activeProject.removePage(this.selectedPage.id);
            this.selectedPage = this.activeProject.getActivePage();
            this.toast.open('Page deleted');
        });
    }

    /**
     * Duplicate selected page.
     */
    public duplicateSelectedPage() {
        this.projects.createPage(this.activeProject.get().id, {
            name: this.selectedPage.name + ' Copy',
            html: this.selectedPage.html,
            css: this.selectedPage.css,
            js: this.selectedPage.js,
            theme: this.selectedPage.theme,
            tags: this.selectedPage.tags,
            title: this.selectedPage.title,
            description: this.selectedPage.description,
        }).subscribe(response => {
            this.activeProject.addPage(response.page);
            this.selectedPage = this.activeProject.getActivePage();
            this.toast.open('Page duplicated');
        });
    }
}
