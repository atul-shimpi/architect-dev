import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {DomHelpers} from "./dom-helpers.service";
import {Settings} from "vebto-client/core/services/settings.service";
import {BuilderDocumentActions} from "./builder-document-actions.service";

type changeSources = 'builderDocument' | 'livePreview' | 'textEditor' | 'codeEditor' | 'activeProject';

@Injectable()
export class BuilderDocument {

    private document: Document;

    private baseUrl: string;

    private customCssNode: HTMLStyleElement;

    private customJsNode: HTMLScriptElement;

    /**
     * Ids of dom elements that are created by the builder and are not part of the project.
     */
    private internalIds = ['base', 'jquery', 'custom-css', 'custom-js', 'framework-css', 'framework-js', 'preview-css', 'font-awesome'];

    /**
     * Fired when preview iframe contents change.
     */
    public contentChanged = new Subject<changeSources>();

    constructor(private settings: Settings, public actions: BuilderDocumentActions) {
        this.baseUrl = this.settings.getBaseUrl(true) + 'storage/';
        this.actions.setChangedSubject(this.contentChanged);
    }

    public get(): Document {
        return this.document;
    }

    public getBody(): HTMLBodyElement {
        return this.document.body as HTMLBodyElement;
    }

    public getOuterHtml(): string {
        return '<!DOCTYPE html>' + this.document.documentElement.outerHTML;
    }

    public getInnerHtml(): string {
        return this.document.documentElement.innerHTML;
    }

    public setHtml(html: string, source: changeSources = 'builderDocument') {
        this.update(html, this.getCustomJs(), this.getCustomCss(), source);
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
     * Get source html of specified page with added css and base tag.
     */
    public update(html: string, js: string, css: string, source: changeSources = 'builderDocument') {
        this.document = new DOMParser().parseFromString(this.trim(html), 'text/html');

        this.internalIds.forEach(id => {
            const node = this.document.getElementById(id);
            node && node.remove();
        });

        this.addBaseElement();

        this.useFramework('bootstrap-3');
        this.addIframeCss();
        this.addIconsLink();

        this.createCustomCssNode(this.trim(css));
        this.createCustomJsNode(this.trim(js));

        this.contentChanged.next(source);
    }

    private addBaseElement() {
        let base = this.document.createElement('base') as HTMLBaseElement;
        base.id = 'base';
        base.href = this.baseUrl;
        this.document.head.insertBefore(base, this.document.head.firstChild);
    }

    private useFramework(name: string) {
        const base = this.baseUrl+'frameworks/'+name+'/';

        const link = DomHelpers.createLink(base+'styles.min.css', 'framework-css');
        this.document.head.appendChild(link);

        const jquery = DomHelpers.createScript(this.baseUrl+'frameworks/jquery.min.js', 'jquery');
        this.document.body.appendChild(jquery);

        const script = DomHelpers.createScript(base+'scripts.min.js', 'framework-js');
        this.document.body.appendChild(script);
    }

    private addIframeCss() {
        const link = DomHelpers.createLink(this.baseUrl+'css/iframe.css', 'preview-css');
        this.document.head.appendChild(link);
    }

    private addIconsLink() {
        const link = DomHelpers.createLink('http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css', 'font-awesome');
        this.document.head.appendChild(link);
    }

    private createCustomCssNode(css: string) {
        this.customCssNode = this.document.createElement('style') as HTMLStyleElement;
        this.customCssNode.id = 'custom-css';
        this.customCssNode.innerHTML = css;
        this.document.head.appendChild(this.customCssNode);
    }

    private createCustomJsNode(js: string) {
        this.customJsNode = this.document.createElement('script') as HTMLScriptElement;
        this.customJsNode.id = 'custom-js';
        this.customJsNode.innerHTML = js;
        this.document.body.appendChild(this.customJsNode);
    }

    private trim(string: string) {
        return (string || '').trim();
    }
}
