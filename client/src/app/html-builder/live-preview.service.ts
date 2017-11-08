import {ElementRef, EventEmitter, Injectable, NgZone, Renderer2} from '@angular/core';
import {Template} from "../../types/models/Template";
import {ParsedTemplate} from "../templates/parsed-template.service";
import {Elements} from "./elements/elements.service";
import {Inspector} from "./inspector/inspector.service";
import {ActiveElement} from "./live-preview/active-element";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {Subscriber} from "rxjs/Subscriber";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class LivePreview {
    public container: HTMLElement;
    public isWebkit = true;
    dragging: any;

    public hover = new ActiveElement();

    public selected = new ActiveElement();

    private renderer: Renderer2;

    private hoverBox: HTMLElement;
    private selectedBox: HTMLElement;

    public document: Document;

    private iframe: HTMLIFrameElement;

    private resizing = false;

    public selecting = false;

    private rowEditorOpen = false;

    /**
     * Fired when element is selected in the builder.
     */
    public elementSelected = new BehaviorSubject(null);

    constructor(private zone: NgZone, private elements: Elements, private inspector: Inspector) {
    }

    public init(renderer: Renderer2, iframe: ElementRef, container: ElementRef, hoverBox: ElementRef, selectedBox: ElementRef) {
        this.document = iframe.nativeElement.contentWindow.document;
        this.iframe = iframe.nativeElement;
        this.hoverBox = hoverBox.nativeElement;
        this.selectedBox = selectedBox.nativeElement;
        this.renderer = renderer;
        this.container = container.nativeElement;

        this.bindToIframeEvents();

        // this.http.get('templates').subscribe(response => {
        //
        // });
    }

    private bindToIframeEvents() {
        this.zone.runOutsideAngular(() => {
            this.listenForHover();
            this.listenForClick();

            this.document.addEventListener('scroll', e => {
                this.renderer.addClass(this.hoverBox, 'hidden');
                if (this.selected.node) this.repositionBox('selected');
            }, true);
        });
    }

    public applyTemplate(template: Template) {
        const parsedTemplate = new ParsedTemplate(template);

        this.iframe.onload = e => {
            this.bindToIframeEvents();
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
            if ( ! node || node === this.hover.node) return;

            this.hover.previous = this.hover.node;

            //hide hover box and bail if we're hovering over a selected node
            if (this.selected.node && this.selected.node == node) {
                return this.renderer.addClass(this.hoverBox, 'hidden');
            }

            //make sure we don't select resize handles
            if (node.className.indexOf('ui-resizable-handle') == -1) {
                this.hover.node = node;

                this.hover.element = this.elements.match(this.hover.node, 'hover', true);

                //only reposition hover box during drag on webkit browsers
                //as it will cause fairly significant lag on IE and Firefox
                if ( ! this.dragging || this.isWebkit) {
                    this.repositionBox('hover', this.hover.node, this.hover.element);
                }

                this.zone.run(() => {});
            }
        });
    }

    private listenForClick() {
        this.renderer.listen(this.document.documentElement, 'click', e => {
            e.preventDefault();

            //hide context menu
            //this.contextMenu.hide();

            this.iframe.contentWindow.focus();

            if (this.resizing || this.selected.node == e.target) return true;

            let node = e.target;

            if (node.hasAttribute('contenteditable') || node.parentNode.hasAttribute('contenteditable')) {
                return;
            }

            let editable = this.iframe.contentDocument.body.querySelectorAll('[contenteditable]');

            for (let i = editable.length - 1; i >= 0; i--) {
                editable[i].removeAttribute('contenteditable');
                //editable[i].blur();
            }

            //hide wysiwyg toolbar when clicked outside it
            // if ( ! this.textToolbar.hasClass('hidden')) {
            //     this.textToolbar.addClass('hidden');
            //     this.$emit('builder.html.changed');
            // }

            //hide linker
            //this.linker.addClass('hidden');

            //hide colorpicker when clicked outside it and if it exists
            // if (this.colorPickerCont) {
            //     this.colorPickerCont.addClass('hidden');
            // }

            if (node.nodeName !== 'HTML') {
                this.zone.run(() => this.selectNode(node));
            }
        })
    }

    /**
     * Select specified node as active one in the builder.
     */
    public selectNode(node: HTMLElement|number) {
        if (this.rowEditorOpen) { return true; }

        this.selecting = true;

        this.selected.previous = this.selected.node;

        //if we get passed an integer instead of a dom node we'll
        //select a node at that index in the currently stored path
        if (typeof node === 'number') {
            node = this.selected.path[node].node;
        }

        //if we haven't already stored a reference to passed in node, do it now
        if (node && this.selected.node !== node) {
            this.selected.node = node as HTMLElement;
        }

        //cache some more references about the node for later use
        this.selected.element = this.elements.match(this.selected.node, 'select', true);
        this.selected.parent = this.selected.node.parentNode as HTMLElement;
        this.selected.parentContents = this.selected.parent.childNodes;

        //position select box on top of the newly selected node
        this.repositionBox('selected');

        //whether or not the new node is locked
        this.selected.locked = this.selected.node.className.indexOf('locked') > -1;
        this.selected.isImage = this.selected.node.nodeName == 'IMG' &&
            this.selected.node.className.indexOf('preview-node') === -1;

        //create an array from all parents of this node
        let el = this.selected.node;
        this.selected.path = [];
        while (el.nodeType === Node.ELEMENT_NODE && el.nodeName.toLowerCase() !== 'body') {
            this.selected.path.unshift({node: el, name: this.getElementDisplayName(this.elements.match(el), el)});
            el = el.parentNode as HTMLElement;
        }

        //whether or not this node is a column
        //this.selected.isColumn = grid.isColumn(this.selected.node);

        this.selected.hasInlineStyles = this.selected.node.style[0] !== null;

        this.inspector.togglePanel('inspector');

        setTimeout(() => {
            this.selecting = false;
        }, 200);

        this.elementSelected.next(this.selected);
    };

    public repositionBox(name: 'hover'|'selected', node?, el?) {

        //hide context boxes depending on user settings
        // if (! settings.get('enable'+name.ucFirst()+'Box')) {
        //     return $scope[name+'Box'].hide();
        // }

        if ( ! node) node = this[name].node;

        if (node && node.nodeName == 'BODY') {
            return this.renderer.addClass(this[name+'Box'], 'hidden');
        }

        if ( ! el) el = this[name].element;

        if ( ! el) return true;

        if (name === 'selected') {
            this.renderer.addClass(this.hoverBox, 'hidden');
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

            this.renderer.removeClass(this[name+'Box'], 'hidden');
        }
    };

    public getElementDisplayName(el: any, node: HTMLElement) {
        if ( ! el) return;

        if (el.name === 'div container') {
            if (node.id) {
                return node.id
            } else if (node.classList[0]) {
                return node.classList[0];
            } else {
                return el.name
            }
        } else {
            return el.name;
        }
    }
}
