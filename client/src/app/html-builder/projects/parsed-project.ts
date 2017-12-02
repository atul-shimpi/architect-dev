import {Injectable} from "@angular/core";
import {Settings} from "vebto-client/core";
import {Template} from "../../../types/models/Template";
import {Page} from "../../../types/models/Page";
import {Project} from "../../../types/models/Project";
import {BuilderDocument} from "../builder-document.service";


@Injectable()
export class ParsedProject {

    private baseUrl: string;

    private activeTemplate: Template;

    private pages: Page[] = [];

    private activePage = 0;

    /**
     * Project model.
     */
    private project: Project;

    /**
     * ParsedProject Constructor.
     */
    constructor(private settings: Settings, private builderDocument: BuilderDocument) {
        this.baseUrl = this.settings.getBaseUrl(true)+'storage/';

        this.builderDocument.contentChanged.subscribe(source => {
            if (source === 'activeProject') return;
            this.pages[this.activePage].html = this.builderDocument.getOuterHtml();
            this.pages[this.activePage].css = this.builderDocument.getCustomCss();
            this.pages[this.activePage].js = this.builderDocument.getCustomJs();
        });
    }

    public get(): Project {
        return this.project;
    }

    public getPages() {
        return this.pages;
    }

    public getActivePage(): Page {
        return this.pages[this.activePage];
    }

    /**
     * Get payload for updating project on the server.
     */
    public getPayload() {
        return {
            name: this.project.name,
            pages: this.project.pages.map(page => {
                return {
                    name: page.name,
                    tags: page.tags,
                    title: page.title,
                    description: page.description,
                    html: page.html,
                    css: page.css,
                    js: page.js,
                    theme: page.theme,
                }
            })
        }
    }

    /**
     * Add specified page to pages array.
     */
    public addPage(page: Page) {
        this.pages.push(page);
        this.activePage = this.pages.length - 1;
        this.updateBuilderDocument();
    }

    /**
     * Update specified page.
     */
    public updatePage(updatedPage: Page) {
        const i = this.pages.findIndex(page => page.id === updatedPage.id);
        this.pages[i] = updatedPage;
    }

    /**
     * Set specified page as active.
     */
    public setActivePage(page: Page) {
        this.activePage = this.pages.findIndex(curr => curr.id === page.id);
        this.updateBuilderDocument();
    }

    /**
     * Remove specified page from pages array.
     */
    public removePage(id: number) {
        const i = this.pages.findIndex(page => page.id === id);
        this.pages.splice(i, 1);
        this.activePage = i - 1;

        this.updateBuilderDocument();
    }

    public setProject(project: Project) {
        this.project = project;
        this.activePage = 0;
        this.pages = project.pages;

        this.updateBuilderDocument();
    }

    public applyTemplate(template: Template) {
        this.activeTemplate = template;
        this.pages = template.pages.slice();
        this.activePage = 0;

        this.updateBuilderDocument();
    }

    private updateBuilderDocument() {
        this.builderDocument.update(
            this.pages[this.activePage].html,
            this.pages[this.activePage].js,
            this.pages[this.activePage].css,
            'activeProject'
        );
    }
}
