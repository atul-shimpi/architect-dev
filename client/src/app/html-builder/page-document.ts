import {DomHelpers} from "./dom-helpers.service";

export class PageDocument {

    /**
     * Reference to custom css node in the document.
     */
    protected customCssNode: HTMLStyleElement;

    /**
     * Reference to custom js node in the document.
     */
    protected customJsNode: HTMLScriptElement;

    /**
     * Page document object.
     */
    protected document: Document;

    /**
     * Url for "base" tag of the document.
     */
    protected baseUrl: string;

    /**
     * Ids of dom elements that are created by the builder and are not part of the project.
     */
    protected internalIds = [
        'base', 'jquery', 'customCss', 'customJs', 'templateJs',
        'templateCss', 'framework-css', 'framework-js', 'preview-css', 'font-awesome'
    ];

    public getOuterHtml(): string {
        return '<!DOCTYPE html>' + this.document.documentElement.outerHTML;
    }

    public getInnerHtml(): string {
        return this.document.documentElement.innerHTML;
    }

    public getMetaTagValue(name: string) {
        const node = this.document.querySelector('meta[name='+name+']');
        return node && node.getAttribute('content');
    }

    public setMetaTagValue(name: string, value: string) {
        let node = this.document.querySelector('meta[name='+name+']');
        if ( ! node) {
            node = this.document.createElement('meta');
            this.document.head.appendChild(node);
        }

        node.setAttribute('name', name);
        node.setAttribute('content', value);
    }

    public getTitleValue() {
        const node = this.document.querySelector('title');
        return node && node.innerText;
    }

    public setTitleValue(value: string) {
       let node = this.document.querySelector('title');
       if ( ! node) {
           node = this.document.createElement('title');
           this.document.head.appendChild(node);
       }

       node.innerText = value;
    }

    /**
     * Set url for document "base" tag.
     */
    public setBaseUrl(url: string) {
        this.baseUrl = url;
    }

    /**
     * Generate page document from specified markup.
     */
    public generate(html: string, js: string, css: string, template?: {css: string, js: string}): PageDocument {
        this.document = new DOMParser().parseFromString(this.trim(html), 'text/html');

        this.internalIds.forEach(id => {
            const node = this.document.getElementById(id);
            node && node.remove();
        });

        this.addBaseElement();
        this.useFramework('bootstrap-3');
        this.addIconsLink();

        if (template) {
            this.createCssNode('templateCss', this.trim(template.css));
            this.createJsNode('templateJs', this.trim(template.js));
        }

        this.createCssNode('customCss', this.trim(css));
        this.createJsNode('customJs', this.trim(js));

        return this;
    }

    /**
     * Add base html element to document.
     */
    protected addBaseElement() {
        let base = this.document.createElement('base') as HTMLBaseElement;
        base.id = 'base';
        base.href = this.baseUrl;
        this.document.head.insertBefore(base, this.document.head.firstChild);
    }

    /**
     * Add needed links and scripts of specified css framework to document.
     */
    protected useFramework(name: string) {
        const link = DomHelpers.createLink(this.baseUrl+'css/framework.css', 'framework-css');
        this.document.head.appendChild(link);

        const jquery = DomHelpers.createScript(this.baseUrl+'js/jquery.min.js', 'jquery');
        this.document.body.appendChild(jquery);

        const script = DomHelpers.createScript(this.baseUrl+'js/framework.js', 'framework-js');
        this.document.body.appendChild(script);
    }

    /**
     * Add font awesome icons link to the document.
     */
    protected addIconsLink() {
        const link = DomHelpers.createLink('http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css', 'font-awesome');
        this.document.head.appendChild(link);
    }

    /**
     * Create and add custom or template css style tag to document.
     */
    protected createCssNode(name: 'customCss'|'templateCss', css: string) {
        this[name+'Node'] = this.document.createElement('style') as HTMLStyleElement;
        this[name+'Node'].id = name;
        this[name+'Node'].innerHTML = css;
        this.document.head.appendChild(this[name+'Node']);
    }

    /**
     * Create and add custom or template js style tag to document.
     */
    protected createJsNode(name: 'customJs'|'templateJs', js: string) {
        this[name+'Node'] = this.document.createElement('script') as HTMLScriptElement;
        this[name+'Node'].id = 'custom-js';
        this[name+'Node'].innerHTML = js;
        this.document.body.appendChild(this[name+'Node']);
    }

    /**
     * Trim whitespace from specified markup string.
     */
    protected trim(string: string) {
        return (string || '').trim();
    }
}
