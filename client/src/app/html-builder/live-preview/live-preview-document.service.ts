import {ElementRef, Injectable} from '@angular/core';

@Injectable()
export class LivePreviewDocument {

    private document: Document;

    public init(iframe: ElementRef) {
        this.document = iframe.nativeElement.contentDocument;
    }

    public get(): Document {
        return this.document;
    }

    public getBody(): HTMLBodyElement {
        return this.document.body as HTMLBodyElement;
    }

    public focus() {
        this.getBody().focus();
    }

    public getScrollTop(): number {
        return this.getBody().scrollTop;
    }

    public scrollIntoView(node: HTMLElement) {
        if ( ! node) return;
        node.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
    }

    public getOuterHtml(): string {
        return this.document.documentElement.outerHTML;
    }

    public elementFromPoint(x: number, y: number): HTMLElement {
        return this.document.elementFromPoint(x, y) as HTMLElement;
    }

    public createElement(tagName: string): HTMLElement {
        return this.document.createElement(tagName);
    }

    public setInnerHtml(html: string) {
        this.document.documentElement.innerHTML = html.trim();
    }

    public on(name: string, callback: Function, useCapture?: boolean) {
        this.document.addEventListener(name as any, callback as any, useCapture);
    }

    public find(selector: string): HTMLElement {
        return this.document.querySelector(selector) as HTMLElement;
    }

    public findAll(selector: string): NodeListOf<HTMLElement> {
        return this.document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
    }

    public execCommand(name: string, value?: string|number) {
        return this.document.execCommand(name, null, value);
    }

    public queryCommandState(name: string): boolean {
        return this.document.queryCommandState(name);
    }
}
