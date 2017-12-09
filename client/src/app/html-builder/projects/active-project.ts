import {Injectable} from "@angular/core";
import {Settings} from "vebto-client/core";
import {BuilderDocument} from "../builder-document.service";
import {ProjectBaseUrl} from "./project-base-url.service";
import {BuilderPage, BuilderProject} from "../builder-types";
import {LivePreviewDocument} from "../live-preview/live-preview-document.service";
import {Projects} from "./projects.service";
import {Observable} from "rxjs/Observable";
import * as html2canvas from "html2canvas";
import {Template} from "../../../types/models/Template";

@Injectable()
export class ActiveProject {

    /**
     * Template applied to the project.
     */
    private activeTemplate: Template;

    /**
     * Pages of the project.
     */
    private pages: BuilderPage[] = [];

    /**
     * Index of currently active page.
     */
    private activePage = 0;

    /**
     * Project model.
     */
    private project: BuilderProject;

    /**
     * Whether project is being saved currently.
     */
    public saving = false;

    /**
     * ActiveProject Constructor.
     */
    constructor(
        private settings: Settings,
        private builderDocument: BuilderDocument,
        private projectUrl: ProjectBaseUrl,
        private previewDocument: LivePreviewDocument,
        private projects: Projects,
    ) {
        this.builderDocument.contentChanged.subscribe(source => {
            if (source === 'activeProject') return;
            this.pages[this.activePage].html = this.builderDocument.getOuterHtml();
        });
    }

    /**
     * Get project model.
     */
    public get(): BuilderProject {
        return this.project;
    }

    /**
     * Get all project pages.
     */
    public getPages() {
        return this.pages;
    }

    /**
     * Get active project page.
     */
    public getActivePage(): BuilderPage {
        return this.pages[this.activePage];
    }

    /**
     * Save project to the backend.
     */
    public save(options = {thumbnail: true}): Observable<{project: BuilderProject}> {
        this.saving = true;

        if (options.thumbnail) {
            html2canvas(this.previewDocument.getBody(), {height: 320, width: 200, svgRendering: true}).then(canvas => {
                this.projects.generateThumbnail(this.project.model.id, canvas.toDataURL('image/png')).subscribe();
            });
        }

        const payload = {
            name: this.project.model.name,
            css: this.project.css,
            js: this.project.js,
            pages: this.pages.map(page => {
                return {name: page.name, html: page.html}
            })
        };

        const request = this.projects.update(this.project.model.id, payload).share();

        request.subscribe(response => {
            this.project = response.project;
            this.saving = false;
        });

        return request;
    }

    /**
     * Add specified page to pages array.
     */
    public addPage(page: BuilderPage) {
        this.pages.push(page);
        this.activePage = this.pages.length - 1;
        this.updateBuilderDocument();
        return page;
    }

    /**
     * Update specified page.
     */
    public updatePage(updatedPage: BuilderPage): ActiveProject {
        const i = this.pages.findIndex(page => page.name === updatedPage.name);
        this.pages[i] = updatedPage;
        return this;
    }

    /**
     * Set specified page as active.
     */
    public setActivePage(page: BuilderPage) {
        this.activePage = this.pages.findIndex(curr => curr.name === page.name);
        this.updateBuilderDocument();
    }

    /**
     * Remove specified page from pages array.
     */
    public removePage(name: string) {
        const i = this.pages.findIndex(page => page.name === name);
        this.pages.splice(i, 1);
        this.activePage = i - 1;

        this.updateBuilderDocument();
    }

    public setProject(project: BuilderProject) {
        this.project = project;
        this.activePage = 0;
        this.pages = project.pages;
        this.activeTemplate = project.template;

        this.setBuilderDocumentBaseUrl();
        this.updateBuilderDocument();
    }

    public applyTemplate(template: Template) {
        this.activeTemplate = template;
        this.pages = template.pages.slice() as BuilderPage[];
        this.activePage = 0;

        this.updateBuilderDocument();
    }

    public getBaseUrl(relative: boolean = false) {
        return this.projectUrl.generate(this.project.model.uuid, relative);
    }

    private updateBuilderDocument() {
        this.builderDocument.update(
            this.pages[this.activePage].html,
            this.activeTemplate,
            'activeProject'
        );
    }

    public getTemplate(): Template {
        return this.activeTemplate;
    }

    public hasTemplate(): boolean {
        return this.activeTemplate !== undefined;
    }

    private setBuilderDocumentBaseUrl() {
        this.builderDocument.setBaseUrl(this.projectUrl.generate(this.project.model.uuid));
    }
}
