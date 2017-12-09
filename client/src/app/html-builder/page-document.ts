import {DomHelpers} from "./dom-helpers.service";
import {utils} from "vebto-client/core/services/utils";
import {Template} from "../../types/models/Template";

export class PageDocument {

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
        'base', 'jquery', 'custom-css', 'custom-js', 'template-js',
        'template-css', 'framework-css', 'framework-js', 'preview-css', 'font-awesome'
    ];

    public getOuterHtml(): string {
        return '<!DOCTYPE html>' + this.document.documentElement.outerHTML;
    }

    public getInnerHtml(): string {
        return this.document.documentElement.innerHTML;
    }

    public getMetaTagValue(name: string) {
        const node = this.document.querySelector(`meta[name=${name}]`);
        return node && node.getAttribute('content');
    }

    public setMetaTagValue(name: string, value: string) {
        let node = this.document.querySelector(`meta[name=${name}]`);
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
    public setBaseUrl(url: string): PageDocument {
        this.baseUrl = url;
        return this;
    }

    /**
     * Generate page document from specified markup.
     */
    public generate(html: string = '', template?: Template): PageDocument {
        this.document = new DOMParser().parseFromString(this.trim(html), 'text/html');

        //remove old link/script nodes to frameworks, icons, templates etc.
        this.internalIds.forEach(id => {
            this.document.querySelectorAll('#'+id).forEach((node: HTMLElement) => {
                node.parentNode.removeChild(node);
            });
        });

        this.addBaseElement();
        this.useFramework('bootstrap-3');
        this.addIconsLink();

        if (template) {
            this.createLink('link', 'css/template.css', 'template-css');
            this.createLink('script', 'js/template.js', 'template-js');
        }

        this.createLink('link', 'css/styles.css', 'custom-css');
        this.createLink('script', 'js/scripts.js', 'template-js');

        return this;
    }

    /**
     * Create a stylesheet or scripts link from specified uri.
     */
    private createLink(type: 'link'|'script', uri: string, id: string) {
        const query  = utils.randomString(8),
              parent = type === 'link' ? this.document.head : this.document.body;

        type = utils.ucFirst(type);
        const link = DomHelpers['create'+type](this.baseUrl+uri+'?='+query, id);

        parent.appendChild(link);
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
     * Trim whitespace from specified markup string.
     */
    protected trim(string: string) {
        return (string || '').trim();
    }
}
