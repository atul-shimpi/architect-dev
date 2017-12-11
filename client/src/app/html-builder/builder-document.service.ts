import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {BuilderDocumentActions} from "./builder-document-actions.service";
import {Template} from "../../types/models/Template";
import {PageDocument} from "./page-document";
import {DomHelpers} from "./dom-helpers.service";
import {Settings} from "vebto-client/core/services/settings.service";
import {BuilderTemplate} from "./builder-types";

export type changeSources = 'builderDocument' | 'livePreview' | 'textEditor' | 'codeEditor' | 'activeProject';

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
        this.update(html, this.template, source);
    }

    /**
     * Update builder document using specified markup.
     */
    public update(html: string, template: BuilderTemplate, source: changeSources = 'builderDocument') {
        this.template = template;
        this.generate(html, template);
        this.addIframeCss();
        this.contentChanged.next(source);
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
