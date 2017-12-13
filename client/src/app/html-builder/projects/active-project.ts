import {Injectable} from "@angular/core";
import {Settings} from "vebto-client/core";
import {BuilderDocument} from "../builder-document.service";
import {ProjectBaseUrl} from "./project-base-url.service";
import {BuilderPage, BuilderProject, BuilderTemplate} from "../builder-types";
import {Projects} from "./projects.service";
import {Observable} from "rxjs/Observable";
import * as html2canvas from "html2canvas";
import {Templates} from "../../templates/templates.service";
import {PageDocument} from "../page-document";
import {Toast} from "vebto-client/core/ui/toast.service";
import {Subject} from "rxjs/Subject";

@Injectable()
export class ActiveProject {

    /**
     * Template applied to the project.
     */
    private activeTemplate: BuilderTemplate;

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
        private projects: Projects,
        private templates: Templates,
        private toast: Toast,
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
     * Find a page by specified name.
     */
    public getPage(name: string): BuilderPage {
        return this.pages.find(page => page.name.toLowerCase() === name.toLowerCase());
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
    public save(options: {thumbnail?: boolean, params?: object} = {thumbnail: true}): Observable<{project: BuilderProject}> {
        this.saving = true;

        if (options.thumbnail) {
            html2canvas(this.builderDocument.getBody(), {height: 320, width: 200, svgRendering: true}).then(canvas => {
                this.projects.generateThumbnail(this.project.model.id, canvas.toDataURL('image/png')).subscribe();
            });
        }

        if ( ! options.params) options.params = {};

        const payload = Object.assign({}, options.params, {
            name: this.project.model.name,
            css: this.project.css,
            js: this.project.js,
            pages: this.pages.map(page => {
                return {name: page.name, html: page.html}
            })
        });

        const request = this.projects.update(this.project.model.id, payload).share();

        request.subscribe(response => {
            this.project = response.project;
            this.saving = false;
        }, () => {
            this.saving = false;
            this.toast.open('Could not save project');
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
        this.builderDocument.setTemplate(this.activeTemplate);
    }

    public applyTemplate(name: string) {
        const completed = new Subject();

        this.templates.get(name).subscribe(response => {
            this.activeTemplate = response.template;
            this.pages = response.template.pages.map(page => {
                return {
                    name: page.name,
                    html: (new PageDocument(this.getBaseUrl())).generate(page.html, this.activeTemplate).getOuterHtml(),
                }
            });
            this.activePage = 0;
            this.updateBuilderDocument();
            this.save({thumbnail: true, params: {template: name}});
            completed.next() && completed.complete();
        });

        return completed;
    }

    /**
     * Get project's base static files url.
     */
    public getBaseUrl(relative: boolean = false) {
        return this.projectUrl.generate(this.project.model.uuid, relative);
    }

    /**
     * Get project's site pretty url that is routed via architect.
     */
    public getSiteUrl() {
        return this.settings.getBaseUrl(true) + 'sites/' + this.project.model.name;
    }

    private updateBuilderDocument() {
        this.builderDocument.update(
            this.getActivePage().html,
            this.activeTemplate,
            'activeProject'
        );
    }

    public getTemplate(): BuilderTemplate {
        return this.activeTemplate;
    }

    public hasTemplate(): boolean {
        return this.activeTemplate !== undefined;
    }
}
