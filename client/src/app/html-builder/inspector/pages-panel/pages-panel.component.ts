import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ParsedProject} from "../../projects/parsed-project";
import {Page} from "../../../../types/models/Page";
import {Projects} from "../../projects/projects.service";
import {Toast} from "vebto-client/core";
import {BuilderPage} from "../../builder-types";
import {BuilderDocument} from "../../builder-document.service";
import {ContextBoxes} from "../../live-preview/context-boxes.service";

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
    public selectedPage: BuilderPage;

    /**
     * Model for binding page update inputs.
     */
    public updateModel: {
        name?: string,
        title?: string,
        description?: string,
        keywords?: string,
    } = {};

    /**
     * Errors returned from the backend.
     */
    public errors: {name?: string, title?: string, keywords?: string, description?: string} = {};

    /**
     * PagesPanelComponent Constructor.
     */
    constructor(
        public activeProject: ParsedProject,
        private projects: Projects,
        private toast: Toast,
        private builderDocument: BuilderDocument,
        private contextBoxes: ContextBoxes,
    ) {}

    ngOnInit() {
        this.selectedPage = this.activeProject.getPages()[0];
        this.hydrateUpdateModel();
    }

    public createNewPage() {
        let name = 'Page '+(this.activeProject.getPages().length + 1);

        if (this.activeProject.getPages().find(page => page.name === name)) {
            name += ' Copy';
        }

        this.selectedPage = this.activeProject.addPage({name: name, html: ''});

        this.activeProject.save().subscribe(() => {
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
        this.hydrateUpdateModel();
        this.activeProject.setActivePage(this.selectedPage);
        this.contextBoxes.hideBoxes();
    }

    public updateSelectedPage() {
        this.builderDocument.setMetaTagValue('keywords', this.updateModel.keywords);
        this.builderDocument.setTitleValue(this.updateModel.title);
        this.builderDocument.setMetaTagValue('description', this.updateModel.description);
        this.builderDocument.contentChanged.next('builderDocument');

        const page = {name: this.updateModel.name, html: this.builderDocument.getOuterHtml()};

        this.activeProject.updatePage(page).save({thumbnail: false}).subscribe(() => {
            this.toast.open('Page updated');
        });
    }

    /**
     * Delete currently selected page.
     */
    public deleteSelectedPage() {
        this.activeProject.removePage(this.selectedPage.name);
        this.selectedPage = this.activeProject.getActivePage();

        this.activeProject.save({thumbnail: false}).subscribe(() => {
            this.toast.open('Page deleted');
        });
    }

    /**
     * Duplicate selected page.
     */
    public duplicateSelectedPage() {
        this.activeProject.addPage({
            name: this.selectedPage.name + ' Copy',
            html: this.selectedPage.html,
        });

        this.selectedPage = this.activeProject.getActivePage();

        this.activeProject.save({thumbnail: false}).subscribe(() => {
            this.toast.open('Page duplicated');
        });
    }

    private hydrateUpdateModel() {
        this.updateModel = {
            name: this.selectedPage.name,
            title: this.builderDocument.getTitleValue(),
            description: this.builderDocument.getMetaTagValue('description'),
            keywords: this.builderDocument.getMetaTagValue('keywords'),
        };
    }
}
