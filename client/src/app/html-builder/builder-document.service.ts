import {ElementRef, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class BuilderDocument {

    private document: Document;

    private iframe: HTMLIFrameElement;

    /**
     * Fired when preview iframe contents change.
     */
    public contentChanged = new BehaviorSubject<{type: string, elementName?: string, node?: HTMLElement, initiator?: string}>({type: 'domReloaded'});

    public init(iframe: ElementRef) {
        this.iframe = iframe.nativeElement;
        this.document = this.iframe.contentDocument;
    }

    public createElement(name: string): HTMLElement {
        return this.document.createElement(name);
    }

    public emitContentChanged(type: string, element?: string, node?: HTMLElement, initiator: string = 'visual-builder') {
        this.contentChanged.next({type: type, elementName: element, node: node, initiator: initiator});
    }

    public on(name: string, callback: Function, useCapture?: boolean) {
        if (name === 'load') {
            this.iframe.onload = callback as any;
        } else {
            this.document.body.addEventListener(name as any, callback as any, useCapture);
        }
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

    public elementFromPoint(x: number, y: number): HTMLElement {
        const el = this.document.elementFromPoint(x, y) as HTMLElement;

        //firefox returns html if body is empty,
        //IE doesn't work at all sometimes.
        if ( ! el || el.nodeName === 'HTML') {
            return this.getBody();
        }

        return el;
    }

    public getScrollTop(): number {
        return this.document.documentElement.scrollTop;
    }

    public focus() {
        this.iframe.contentWindow.focus();
    }

    public write(html: string) {
        this.document.open();
        this.document.write(html);
        this.document.close();
    }

    public get(): Document {
        return this.document;
    }

    public getBody(): HTMLBodyElement {
        return this.document.body as HTMLBodyElement;
    }

    public getHead(): HTMLHeadElement {
        return this.document.head as HTMLHeadElement;
    }

    public getInnerHtml(): string {
        return this.document.documentElement.innerHTML;
    }

}
