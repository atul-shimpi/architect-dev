import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {BuilderDocumentActions} from "./builder-document-actions.service";
import {Template} from "../../types/models/Template";
import {PageDocument} from "./page-document";
import {DomHelpers} from "./dom-helpers.service";
import {Settings} from "vebto-client/core/services/settings.service";
import {BuilderTemplate} from "./builder-types";

export type changeSources = 'builderDocument' | 'livePreview' | 'textEditor' | 'codeEditor' | 'activeProject';
export type Template = {css: string, js: string};

@Injectable()
export class BuilderDocument extends PageDocument {

    /**
     * Fired when preview iframe contents change.
     */
    public contentChanged = new Subject<changeSources>();

    /**
     * Template that should be applied to the document.
     */
    private template: BuilderTemplate;

    /**
     * BuilderDocument Constructor.
     */
    constructor(public actions: BuilderDocumentActions, private settings: Settings) {
        super();
        this.actions.setChangedSubject(this.contentChanged);
    }

    public get(): Document {
        return this.document;
    }

    public getBody(): HTMLBodyElement {
        return this.document.body as HTMLBodyElement;
    }

    public setHtml(html: string, source: changeSources = 'builderDocument') {
        this.update(html, this.getCustomJs(), this.getCustomCss(), this.template, source);
    }

    public setCustomJs(js: string, source: changeSources = 'builderDocument') {
        this.customJsNode.innerHTML = js.trim();
        this.contentChanged.next(source);
    }

    public setCustomCss(css: string, source: changeSources = 'builderDocument') {
        this.customCssNode.innerHTML = css.trim();
        this.contentChanged.next(source);
    }

    public getCustomCss() {
        return this.customCssNode.innerHTML;
    }

    public getCustomJs() {
        return this.customJsNode.innerHTML;
    }

    /**
     * Update builder document using specified markup.
     */
    public update(html: string, js: string, css: string, template: BuilderTemplate, source: changeSources = 'builderDocument') {
        this.template = template;
        this.generate(html, js, css, this.getTemplateMarkup());
        this.addIframeCss();
        this.contentChanged.next(source);
    }

    private getTemplateMarkup() {
        if ( ! this.template) return;
        return {css: this.template.css, js: this.template.js};
    }

    /**
     * Add html builder iframe css to the document.
     */
    private addIframeCss() {
        const url = this.settings.getBaseUrl(true) + 'assets/css/iframe.css';
        const link = DomHelpers.createLink(url, 'preview-css');
        this.document.head.appendChild(link);
    }
}
