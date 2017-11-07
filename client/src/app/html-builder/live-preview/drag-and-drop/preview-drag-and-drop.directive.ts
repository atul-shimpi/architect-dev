import {Directive, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {LivePreview} from "../../live-preview.service";
import {HammerInput} from "@angular/material";
import {LivePreviewScroller} from "./live-preview-scroller";
import {UndoManager} from "../../undo-manager/undo-manager.service";
import ActiveElement from "../live-preview-types";
import {Elements} from "../../elements/elements.service";
import commandParams from "../../undo-manager/undo-manager-types";

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
    private dragEl: ActiveElement;

    private undoCommandParams: commandParams;

    /**
     * PreviewDragAndDropDirective Constructor.
     */
    constructor(
        private livePreview: LivePreview,
        private renderer: Renderer2,
        private undoManager: UndoManager,
        private elements: Elements,
    ) {}

    ngOnInit() {
        this.initHammer();
        this.scroller = new LivePreviewScroller(this.livePreview.document, this.livePreview.container);
    }

    private handleDragStart(e: HammerInput|any) {
        this.livePreview.dragging = true;
        this.dragEl = this.livePreview.hover;

        //start a new undo command
        this.undoCommandParams = {
            undoIndex: this.getNodeIndex(this.dragEl.node.parentNode.childNodes, this.dragEl.node),
            node: this.dragEl.node,
            undoParent: this.dragEl.node.parentNode,
            parentContents: this.dragEl.node.parentNode.childNodes
        };

        this.renderer.setStyle(this.dragOverlay, 'display', 'block');
        this.renderer.setAttribute(this.dragEl.node, 'data-display', this.dragEl.node.style.display);
        this.createAndAppendDragMirror();
        this.createAndAppendDropPlaceholder();
        this.renderer.setStyle(this.dragEl.node, 'display', 'none');
    }

    private getNodeIndex(nodeList: NodeList, node: Node) {
        for (let i = nodeList.length - 1; i >= 0; i--) {
            if (nodeList[i] == node) { return i; };
        }
    }

    private handleDrag(e: HammerInput|any) {
        const scrollTop = this.livePreview.document.body.scrollTop,
              x = e.center.x - 380,
              y = e.center.y + scrollTop;

        let under = this.livePreview.getElementFromPoint(x, y);

        this.scroller.scroll(y);

        this.repositionDragMirror(y, x);

        const classes = this.dragEl.node.className;

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
        this.dropPlaceholder.parentNode.replaceChild(this.dragEl.node, this.dropPlaceholder);

        //store index of active on last command so we can redo it
        this.undoCommandParams.redoIndex = this.getNodeIndex(this.dragEl.node.parentNode.childNodes, this.dragEl.node);
        this.undoCommandParams.redoParent = this.dragEl.node.parentNode;
        this.undoManager.add('reorderElement', this.undoCommandParams);

        this.renderer.setStyle(this.dragEl.node, 'display', this.dragEl.node.getAttribute('data-display'));
        this.renderer.removeAttribute(this.dragEl.node, 'data-display');
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
        if (this.dragEl.node == node || this.dragEl.node.contains(node)) {
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
                if (this.elements.canInsert(node, this.dragEl)) {

                    //make sure we don't insert elements before body node
                    if (n.nodeName == 'BODY') {
                        n.appendChild(this.dropPlaceholder);
                    } else {
                        n.parentNode.insertBefore(this.dropPlaceholder, n);
                    }

                    //reposition context boxes
                    return this.livePreview.repositionBox('selected');
                }
            }
        }

        //if users cursor is not above any children on the node we'll
        //just append active element to the node
        if (this.elements.canInsert(node, this.dragEl)) {
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
        this.dragMirror = this.dragEl.node.cloneNode(true) as HTMLElement;
        this.renderer.setStyle(this.dragMirror, 'position', 'fixed');
        this.renderer.setStyle(this.dragMirror, 'pointer-events', 'none');
        this.renderer.setStyle(this.dragMirror, 'margin', 0);
        this.renderer.setStyle(this.dragMirror, 'padding', 0);
        this.renderer.setStyle(this.dragMirror, 'transition', 'none');
        this.dragEl.node.parentNode.appendChild(this.dragMirror);
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
        this.renderer.setStyle(this.dropPlaceholder, 'display', this.dragEl.node.getAttribute('data-display'));
        this.renderer.setStyle(this.dropPlaceholder, 'pointer-events', 'none');
        this.renderer.setStyle(this.dropPlaceholder, 'height', '20px');
        this.renderer.setStyle(this.dropPlaceholder, 'opacity', '0.7');
        this.renderer.setStyle(
            this.dropPlaceholder,
            'background',
            'repeating-linear-gradient(45deg,#ccc,#ccc 2px,#dbdbdb 2px,#dbdbdb 4px)'
        );
        this.dragEl.node.parentNode.appendChild(this.dropPlaceholder);
    }
}
