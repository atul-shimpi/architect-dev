import {Directive, Input, OnInit, Renderer2} from '@angular/core';
import {LivePreview} from "../../live-preview.service";
import {HammerInput} from "@angular/material";
import {LivePreviewScroller} from "./live-preview-scroller";
import {UndoManager} from "../../undo-manager/undo-manager.service";
import {Elements} from "../../elements/elements.service";
import commandParams from "../../undo-manager/undo-manager-types";
import {ActiveElement} from "../active-element";
import {DragVisualHelperComponent} from "./drag-visual-helper/drag-visual-helper.component";
import {BaseDragAndDrop} from "./base-drag-and-drop";

@Directive({
    selector: '[previewDragAndDrop]'
})
export class PreviewDragAndDropDirective extends BaseDragAndDrop implements OnInit {

    /**
     * PreviewDragAndDropDirective Constructor.
     */
    constructor(
        protected livePreview: LivePreview,
        protected renderer: Renderer2,
        protected undoManager: UndoManager,
        protected elements: Elements,
    ) {
        super(livePreview, renderer, undoManager, elements);
    }

    /**
     * Init hammer manager and bind drag events.
     */
    protected initHammer() {
        let hammer = new Hammer.Manager(this.dragHandle);
        let pan = new Hammer.Pan({direction: Hammer.DIRECTION_ALL, threshold: 0});
        hammer.add([pan]);

        hammer.on('panstart', e => this.handleDragStart(e));
        hammer.on('panmove', e => this.handleDrag(e));
        hammer.on('panend', e => this.handleDragEnd(e));
    }

    protected handleDragStart(e: HammerInput|any) {
        this.livePreview.dragging = true;
        this.dragEl = this.livePreview.selected;

        //start a new undo command
        this.undoCommandParams = {
            undoIndex: this.getNodeIndex(this.dragEl.node.parentNode.childNodes, this.dragEl.node),
            node: this.dragEl.node,
            undoParent: this.dragEl.node.parentNode,
            parentContents: this.dragEl.node.parentNode.childNodes
        };

        this.renderer.setStyle(this.dragOverlay, 'display', 'block');
        this.dragHelper.show();

        if (this.dragEl.element.name !== 'column') {
            this.renderer.setAttribute(this.dragEl.node, 'data-display', this.dragEl.node.style.display);
            this.createAndAppendDropPlaceholder();
            this.renderer.setStyle(this.dragEl.node, 'display', 'none');
        }
    }

    protected getNodeIndex(nodeList: NodeList, node: Node) {
        for (let i = nodeList.length - 1; i >= 0; i--) {
            if (nodeList[i] == node) { return i; };
        }
    }

    protected handleDrag(e: HammerInput|any) {
        const scrollTop = this.livePreview.document.body.scrollTop,
              x = e.center.x - 380,
              y = e.center.y + scrollTop;

        let under = this.livePreview.getElementFromPoint(x, y);
        if ( ! under) return;

        this.scroller.scroll(y);

        this.repositionDragMirror(y, x);

        const classes = this.dragEl.node.className;

        if (classes && classes.match('col-')) {
            return this.sortColumns(under, x, y);
        } else {
            return this.repositionDropPlaceholder(under, x, y);
        }
    }

    protected handleDragEnd(e: HammerInput|any) {
        this.scroller.stopScrolling();
        this.livePreview.dragging = false;
        this.dropPlaceholder && this.dropPlaceholder.parentNode.replaceChild(this.dragEl.node, this.dropPlaceholder);

        //store index of active on last command so we can redo it
        this.undoCommandParams.redoIndex = this.getNodeIndex(this.dragEl.node.parentNode.childNodes, this.dragEl.node);
        this.undoCommandParams.redoParent = this.dragEl.node.parentNode;
        this.undoManager.add('reorderElement', this.undoCommandParams);

        this.dragHelper.hide();
        this.renderer.setStyle(this.dragOverlay, 'display', 'none');

        if (this.dragEl.element.name !== 'column') {
            this.renderer.setStyle(this.dragEl.node, 'display', this.dragEl.node.getAttribute('data-display'));
            this.renderer.removeAttribute(this.dragEl.node, 'data-display');
            this.dropPlaceholder.remove();
            this.dropPlaceholder = null;
        }
    }

    protected sortColumns(node: HTMLElement, x: number, y: number) {
        const className = node.parentElement.className;

        if (node === this.dragEl.node || node.parentNode !== this.dragEl.node.parentNode) return;

        //constrain column ordering withing row
        if (className && className.match('row')) {

            //switch column positions
            if (this.oldX && x > this.oldX) {
                this.dragEl.node['before'](node);
            } else {
                this.dragEl.node['after'](node);
            }

            this.livePreview.repositionBox('selected');
        }

        this.oldX = x;
    }

    /**
     * Append element user is currently dragging to the element users cursor is under.
     */
    protected repositionDropPlaceholder(node: HTMLElement, x: number, y: number) {
        if ( ! node) return;

        //check if we're not trying to drop a node inside its child or itself
        if (this.dragEl.node == node || this.dragEl.node.contains(node)) return;

        //get all the children of passed in node
        let contents = node.children, n;

        for (let i = 0, len = contents.length; i < len; i++) {
            n = contents[i];

            //check if cursor is currently above any of the specified nodes children
            if (this.above(n, x, y)) {

                //if we can insert active element to given node and user's
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

        //if user's cursor is not above any children on the node we'll
        //just append active element to the node
        if (this.elements.canInsert(node, this.dragEl)) {
            node.appendChild(this.dropPlaceholder);
        }

        return true;
    }

    /**
     * Return whether or not given coordinates are above given element in the dom.
     */
    protected above(el, x: number, y: number): boolean {
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
     * Position drag mirror at specified coordinates.
     */
    protected repositionDragMirror(y: any, x: number) {
        this.dragHelper.reposition(y, x);
    }


    protected createAndAppendDropPlaceholder() {
        this.dropPlaceholder = this.livePreview.document.createElement('div');
        this.renderer.setStyle(this.dropPlaceholder, 'display', this.dragEl.node.getAttribute('data-display'));
        this.renderer.setStyle(this.dropPlaceholder, 'pointer-events', 'none');
        this.renderer.setStyle(this.dropPlaceholder, 'height', '50px');
        this.renderer.setStyle(
            this.dropPlaceholder,
            'background',
            'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="6" height="6"><rect width="6" height="6" fill="transparent"/><path d="M0 6L6 0ZM7 5L5 7ZM-1 1L1 -1Z" stroke="rgba(0, 0, 0, 0.2)" stroke-width="2"/></svg>\')'
        );
    }
}
