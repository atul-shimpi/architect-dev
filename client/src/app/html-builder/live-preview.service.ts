import {ElementRef, Injectable, NgZone, Renderer2} from '@angular/core';
import {Template} from "../../types/models/Template";
import {ParsedTemplate} from "../templates/parsed-template.service";

@Injectable()
export class LivePreview {
    public container: HTMLElement;
    public isWebkit: boolean;
    dragging: any;

    public hover = {
        node: null,
        previous: null,
        element: null,
    };

    public selected = {
        element: null,
        node: null,
        previous: null,
    };

    private renderer: Renderer2;

    private hoverBox: HTMLElement;

    public document: Document;

    private iframe: HTMLElement;

    private frameOffset = {
        left: 300,
    };

    constructor(private zone: NgZone) {
    }

    public init(renderer: Renderer2, iframe: ElementRef, container: ElementRef, hoverBox: ElementRef) {
        this.document = iframe.nativeElement.contentWindow.document;
        this.iframe = iframe.nativeElement;
        this.hoverBox = hoverBox.nativeElement;
        this.renderer = renderer;
        this.container = container.nativeElement;

        this.zone.runOutsideAngular(() => {
            this.listenForHover();

            this.renderer.listen(this.document.documentElement, 'scroll', () => {
                console.log('x');
                this.renderer.addClass(this.hoverBox, 'hidden');
            });
        });



        // this.http.get('templates').subscribe(response => {
        //
        // });
    }

    public applyTemplate(template: Template) {
        const parsedTemplate = new ParsedTemplate(template);

        this.iframe.onload = e => {
            this.zone.runOutsideAngular(() => this.listenForHover());

            this.renderer.listen(this.document.documentElement, 'scroll', () => {
                console.log('x');
                this.renderer.addClass(this.hoverBox, 'hidden');
            });
        };

        this.document.open();
        this.document.write(parsedTemplate.getPageHtml(0));
        this.document.close();
    }

    public getElementFromPoint(x: number, y: number) {
        let el = this.document.elementFromPoint(x, y);

        //firefox returns html if body is empty,
        //IE doesn't work at all sometimes.
        if ( ! el || el.nodeName === 'HTML') {
            return this.document.body[0];
        }

        return el;
    };

    private listenForHover() {
        this.renderer.listen(this.document.body, 'mousemove', e => {
            if (this.dragging) return;

            const node = this.getElementFromPoint(e.pageX, e.pageY - this.document.documentElement.scrollTop);
            if ( ! node) return;

            this.hover.previous = this.hover.node;

            //hide hover box and bail if we're hovering over a selected node
            if (this.selected.node && this.selected.node == node) {
                return this.renderer.addClass(this.hoverBox, 'hidden');
            }

            //make sure we don't select resize handles
            if (node.className.indexOf('ui-resizable-handle') == -1) {
                this.hover.node = node;

                //this.hover.element = elements.match(this.hover.node, 'hover', true);

                //only reposition hover box during drag on webkit browsers
                //as it will cause fairly significant lag on IE and Firefox
                if ( ! this.dragging || this.isWebkit) {
                    this.repositionBox('hover', this.hover.node, this.hover.element);
                }
            }
        });
    }

    public repositionBox(name, node?, el?) {

        //hide context boxes depending on user settings
        // if (! settings.get('enable'+name.ucFirst()+'Box')) {
        //     return $scope[name+'Box'].hide();
        // }

        if ( ! node) {
            node = this.selected.node;
        }

        if (node && node.nodeName == 'BODY') {
            return this.renderer.addClass(this[name+'Box'], 'hidden');
        }

        if (! el) {
            el = this.selected.element;
        }

        //if (! el) return true;

        if (name == 'select') {
            return this.renderer.addClass(this.hoverBox, 'hidden');
        }

        const rect = node.getBoundingClientRect();

        if ( ! rect.width || ! rect.height) {
            this.renderer.addClass(this[name+'Box'], 'hidden');
        } else {
            this.renderer.setStyle(this[name+'Box'], 'top', rect.top+'px');
            this.renderer.setStyle(this[name+'Box'], 'left', rect.left+'px');
            this.renderer.setStyle(this[name+'Box'], 'height', rect.height+'px');
            this.renderer.setStyle(this[name+'Box'], 'width', rect.width+'px');

            //this[name+'BoxTag'].textContent = $translate.instant(el.name);

            //make sure boxes don't go over the breadcrumbs
            // if (rect.top + 39 < 55) {
            //     this[name+'BoxActions'].style.top = 0;
            // } else {
            //     this[name+'BoxActions'].style.top = '-27px';
            // }

            this.renderer.removeClass(this[name+'Box'], 'hidden');
        }
    };

}
