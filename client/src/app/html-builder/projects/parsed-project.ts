import {Injectable} from "@angular/core";
import {Settings} from "vebto-client/core";
import {Template} from "../../../types/models/Template";
import {Page} from "../../../types/models/Page";
import {DomHelpers} from "../dom-helpers.service";
import {Project} from "../../../types/models/Project";


@Injectable()
export class ParsedProject {

    /**
     * Document of active page.
     */
    private doc: Document;

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
    constructor(private settings: Settings) {
        this.baseUrl = this.settings.getBaseUrl(true)+'storage/';
    }

    public get(): Project {
        return this.project;
    }

    public getPages() {
        return this.pages;
    }

    /**
     * Remove specified page to pages array.
     */
    public addPage(page: Page) {
        this.pages.push(page);
        this.activePage = this.pages.length - 1;
        this.generatePageDocument(this.activePage);
    }

    public updatePage(updatedPage: Page) {
        const i = this.pages.findIndex(page => page.id === updatedPage.id);
        this.pages[i] = updatedPage;
    }

    /**
     * Remove specified page from pages array.
     */
    public removePage(id: number) {
        const i = this.pages.findIndex(page => page.id === id);
        this.pages.splice(i, 1);
    }

    public setProject(project: Project) {
        this.project = project;
        this.activePage = 0;
        this.pages = project.pages;

        this.generatePageDocument(this.activePage);
    }

    public applyTemplate(template: Template) {
        this.activeTemplate = template;
        this.pages = template.pages.slice();
        this.activePage = 0;

        this.generatePageDocument(this.activePage);
    }

    public setHtml(html: string) {
        this.doc.documentElement.innerHTML = html.trim();
        this.pages[this.activePage].html = html.trim();
    }

    public setCss(css: string) {
        this.doc.documentElement.querySelector('#custom-css').innerHTML = this.trim(css);
        this.pages[this.activePage].css = css.trim();
    }

    public setJs(js: string) {
        this.doc.documentElement.querySelector('#custom-js').innerHTML = this.trim(js);
        this.pages[this.activePage].js = js.trim();
    }

    public getHtml() {
        return '<!DOCTYPE html>' + this.doc.documentElement.outerHTML;
    }

    public getCustomCss() {
        if ( ! this.pages[this.activePage]) return;
        return this.pages[this.activePage].css;
    }

    public getCustomJs() {
        if ( ! this.pages[this.activePage]) return;
        return this.pages[this.activePage].js;
    }

    /**
     * Get source html of specified page with added css and base tag.
     */
    public generatePageDocument(number: number) {
        this.doc = new DOMParser().parseFromString(this.getPageHtml(number), 'text/html');

        this.addBaseElement();

        this.useFramework('bootstrap-3');
        this.addIframeCss();
        this.addIconsLink();

        this.addCustomCss(number);
        this.addCustomJs(number);
    }

    private addBaseElement() {
        let base = this.doc.createElement('base');
        base.href = this.baseUrl;
        this.doc.head.insertBefore(base, this.doc.head.firstChild);
    }

    private addCustomJs(number: number) {
        let script = this.doc.createElement('script');
        script.id = 'custom-js';
        script.innerHTML = this.getPageJs(number);
        this.doc.body.appendChild(script);
    }

    private addCustomCss(number: number) {
        let style = this.doc.createElement('style');
        style.id = 'custom-css';
        style.innerHTML = this.getPageCss(number);
        this.doc.head.appendChild(style);
    }

    private useFramework(name: string) {
        const base = this.baseUrl+'frameworks/'+name+'/';

        const link = DomHelpers.createLink(base+'styles.min.css', 'framework-css');
        this.doc.head.appendChild(link);

        const jquery = DomHelpers.createScript(this.baseUrl+'frameworks/jquery.min.js', 'jquery');
        this.doc.body.appendChild(jquery);

        const script = DomHelpers.createScript(base+'scripts.min.js', 'framework-js');
        this.doc.body.appendChild(script);
    }

    private addIconsLink() {
        let link = this.doc.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css';
        this.doc.head.appendChild(link);
    }

    /**
     * Get source html of specified page.
     */
    private getPageHtml(number: number) {
        return this.trim(this.pages[number].html);
    }

    /**
     * Get source css of specified page.
     */
    private getPageCss(number: number) {
        return this.trim(this.pages[number].css);
    }

    /**
     * Get source js of specified page.
     */
    private getPageJs(number: number) {
        return this.trim(this.pages[number].js);
    }

    private trim(string: string) {
        return string && string.trim();
    }

    private addIframeCss() {
        let link = this.doc.createElement('link');
        link.rel = 'stylesheet';
        link.href = this.baseUrl+'css/iframe.css';
        this.doc.head.appendChild(link);
    }
}
