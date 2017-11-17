import {Injectable} from '@angular/core';
import {Template} from "../../types/models/Template";

@Injectable()
export class ParsedTemplate {

    /**
     * Document of parsed template page.
     */
    private doc: Document;

    private baseUrl: string;

    /**
     * Parsed template constructor.
     */
    constructor(private template: Template, baseUrl: string) {
        this.baseUrl = baseUrl+'storage/';
    }

    /**
     * Get source html of specified page with added css and base tag.
     */
    public getPageHtml(number: number): string {
        this.doc = new DOMParser().parseFromString(this.getValidPageHtml(number), 'text/html');

        let base = this.doc.createElement('base');
        base.href = this.baseUrl;
        this.doc.head.insertBefore(base, this.doc.head.firstChild);

        this.addFrameworkLink('bootstrap-3');
        this.addIconsLink();

        let style = this.doc.createElement('style');
        style.innerHTML = this.getValidPageCss(number);
        this.doc.head.appendChild(style);



        return '<!DOCTYPE html>' + this.doc.documentElement.outerHTML;
    }

    private addFrameworkLink(name: string) {
        let link = this.doc.createElement('link');
        link.rel = 'stylesheet';
        link.href = this.baseUrl+'frameworks/'+name+'/styles.min.css';
        this.doc.head.appendChild(link);
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
    private getValidPageHtml(number: number) {
        return this.template.pages[number].html.trim();
    }

    /**
     * Get source css of specified page.
     */
    private getValidPageCss(number: number) {
        return this.template.pages[number].css.trim();
    }

}
