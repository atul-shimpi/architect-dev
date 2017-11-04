import {Directive, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {LivePreview} from "../../live-preview.service";
import {Elements} from "../../elements/elements.service";
import {HammerInput} from "@angular/material";
import {LivePreviewScroller} from "./live-preview-scroller";

@Directive({
    selector: '[previewDragAndDrop]'
})
export class PreviewDragAndDropDirective implements OnInit {

    @Input() dragHandle: HTMLElement;
    @Input() dragOverlay: HTMLElement;

    /**
     * Helper service for scrolling preview during drag and drop.
     */
    private scroller: LivePreviewScroller;

    /**
     * Mirror helper of element that is currently being dragged.
     */
    private dragMirror: HTMLElement;

    /**
     * Placeholder helper for element that is being dragged.
     */
    private dropPlaceholder: HTMLElement;

    /**
     * Element that is being dragged currently.
     */
    private dragEl: HTMLElement;

    /**
     * PreviewDragAndDropDirective Constructor.
     */
    constructor(
        private livePreview: LivePreview,
        private renderer: Renderer2,
    ) {}

    ngOnInit() {
        this.initHammer();
        this.scroller = new LivePreviewScroller(this.livePreview.document, this.livePreview.container);
    }

    private handleDragStart(e: HammerInput|any) {
        this.livePreview.dragging = true;
        this.renderer.setStyle(this.dragOverlay, 'display', 'block');
        this.dragEl = this.livePreview.hover.node;
        this.renderer.setAttribute(this.dragEl, 'data-display', this.dragEl.style.display);
        this.createAndAppendDragMirror();
        this.createAndAppendDropPlaceholder();
        this.renderer.setStyle(this.dragEl, 'display', 'none');
    }

    private handleDrag(e: HammerInput|any) {
        const scrollTop = this.livePreview.document.body.scrollTop,
              x = e.center.x - 380,
              y = e.center.y + scrollTop;

        let under = this.livePreview.getElementFromPoint(x, y);

        this.scroller.scroll(y);

        this.repositionDragMirror(y, x);

        //only reposition hover box during drag on webkit browsers
        //as it will cause fairly significant lag on IE and Firefox
        if (this.livePreview.isWebkit) {
            this.livePreview.repositionBox('hover', under);
        }

        const classes = this.dragEl.className;

        if (classes && classes.match('col-')) {
            console.log('sort cols');
            //return this._sortColumns(el, point);
        } else {
            return this.repositionDropPlaceholder(under, x, y);
        }
    }

    private handleDragEnd(e: HammerInput|any) {
        this.scroller.stopScrolling();
        this.livePreview.dragging = false;
        this.dropPlaceholder.parentNode.replaceChild(this.dragEl, this.dropPlaceholder);
        this.renderer.setStyle(this.dragEl, 'display', this.dragEl.getAttribute('data-display'));
        this.renderer.removeAttribute(this.dragEl, 'data-display');
        this.dragMirror.remove();
        this.dragMirror = null;
        this.dropPlaceholder.remove();
        this.dropPlaceholder = null;
        this.renderer.setStyle(this.dragOverlay, 'display', 'none');
    }

    /**
     * Append element user is currently dragging to the element users cursor is under.
     */
    private repositionDropPlaceholder(node: HTMLElement, x: number, y: number) {
        if ( ! node) return;

        //check if we're not trying to drop a node inside it's child or itself
        if (this.dragEl == node || this.dragEl.contains(node)) {
            return;
        }

        //apply styles
        this.renderer.setStyle(this.dropPlaceholder, 'display', node.style.display);

        //get all the children of passed in node
        let contents = node.children, n;

        for (let i = 0, len = contents.length; i < len; i++) {
            n = contents[i];

            //check if cursor is currently above any of the specified nodes children
            if (this.above(n, x, y)) {

                //if we can insert active element to given node and users
                //cursor is above one of the children of that node then insert
                //active element before that child and bail
                if (true) { //this.elements.canInsert(node, this.dragEl)

                    //make sure we don't insert elements before body node
                    if (n.nodeName == 'BODY') {
                        n.appendChild(this.dropPlaceholder);
                    } else {
                        n.parentNode.insertBefore(this.dropPlaceholder, n);
                    }

                    //reposition context boxes
                    return this.livePreview.repositionBox('select');
                }
            }
        }

        //if users cursor is not above any children on the node we'll
        //just append active element to the node
        if (true) {//this.elements.canInsertSelectedTo(node)
            node.appendChild(this.dropPlaceholder);
        }

        return true;
    }

    /**
     * Return whether or not given coordinates are above given element in the dom.
     */
    private above(el, x: number, y: number): boolean {
        if (el.nodeName === '#text') return;

        let offset = el.getBoundingClientRect(),
            width = el.offsetWidth,
            height = el.offsetHeight;

        let box = [
            [offset.left, offset.top], //top left
            [offset.left + width, offset.top], //top right
            [offset.left + width, offset.top + height], //bottom right
            [offset.left, offset.top + height] //bottom left
        ];

        let beforePointY = box[0][1],
            beforePointX = box[0][0];

        if (y < box[2][1]) {
            return y < beforePointY || x < beforePointX
        }

        return false;
    }

    /**
     * Create drag mirror helper by cloning node that is being dragged.
     */
    private createAndAppendDragMirror() {
        this.dragMirror = this.dragEl.cloneNode(true) as HTMLElement;
        this.renderer.setStyle(this.dragMirror, 'position', 'fixed');
        this.renderer.setStyle(this.dragMirror, 'pointer-events', 'none');
        this.renderer.setStyle(this.dragMirror, 'margin', 0);
        this.renderer.setStyle(this.dragMirror, 'padding', 0);
        this.renderer.setStyle(this.dragMirror, 'transition', 'none');
        this.dragEl.parentNode.appendChild(this.dragMirror);
    }

    /**
     * Position drag mirror at specified coordinates.
     */
    private repositionDragMirror(y: any, x: number) {
        this.renderer.setStyle(this.dragMirror, 'top', y + 'px');
        this.renderer.setStyle(this.dragMirror, 'left', x + 'px');
    }

    /**
     * Init hammer manager and bind drag events.
     */
    private initHammer() {
        let hammer = new Hammer.Manager(this.dragHandle);
        let pan = new Hammer.Pan({direction: Hammer.DIRECTION_ALL, threshold: 0});
        hammer.add([pan]);

        hammer.on('panstart', e => this.handleDragStart(e));
        hammer.on('panmove', e => this.handleDrag(e));
        hammer.on('panend', e => this.handleDragEnd(e));
    }

    private createAndAppendDropPlaceholder() {
        this.dropPlaceholder = this.livePreview.document.createElement('div');
        this.renderer.setStyle(this.dropPlaceholder, 'display', this.dragEl.getAttribute('data-display'));
        this.renderer.setStyle(this.dropPlaceholder, 'pointer-events', 'none');
        this.renderer.setStyle(this.dropPlaceholder, 'height', '20px');
        this.renderer.setStyle(this.dropPlaceholder, 'opacity', '0.7');
        this.renderer.setStyle(
            this.dropPlaceholder,
            'background',
            'repeating-linear-gradient(45deg,#ccc,#ccc 2px,#dbdbdb 2px,#dbdbdb 4px)'
        );
        this.dragEl.parentNode.appendChild(this.dropPlaceholder);
    }
}
