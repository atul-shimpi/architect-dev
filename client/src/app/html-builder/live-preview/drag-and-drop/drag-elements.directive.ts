import {AfterContentInit, ContentChildren, Directive, ElementRef, NgZone, QueryList, Renderer2} from '@angular/core';
import {LivePreview} from "../../live-preview.service";
import {HammerInput} from "@angular/material";
import {UndoManager} from "../../undo-manager/undo-manager.service";
import {Elements} from "../../elements/elements.service";
import {BaseDragAndDrop} from "./base-drag-and-drop";
import {DomHelpers} from "../../dom-helpers.service";

@Directive({
    selector: '[dragElements]'
})
export class DragElementsDirective extends BaseDragAndDrop implements AfterContentInit {
    @ContentChildren('dragElement') dragElements: QueryList<ElementRef>;

    /**
     * DragElementsDirective Constructor.
     */
    constructor(
        protected livePreview: LivePreview,
        protected renderer: Renderer2,
        protected undoManager: UndoManager,
        protected elements: Elements,
        protected zone: NgZone,
    ) {
        super(livePreview, renderer, undoManager, elements);
    }

    ngAfterContentInit() {
        this.zone.runOutsideAngular(() => {
            this.initHammer(this.dragElements.toArray());
        });
    }

    /**
     * Init hammer manager for specified elements.
     */
    protected initHammer(elements: ElementRef[]) {
        elements.forEach(ref => {
            let hammer = new Hammer.Manager(ref.nativeElement);
            let pan = new Hammer.Pan({direction: Hammer.DIRECTION_ALL, threshold: 0});
            hammer.add([pan]);

            hammer.on('panstart', e => this.handleDragStart(e));
            hammer.on('panmove', e => this.handleDrag(e));
            hammer.on('panend', e => this.handleDragEnd(e));
        });
    }

    protected handleDragStart(e: HammerInput) {
        this.livePreview.dragging = true;

        const el = this.elements.findByName(e.target.closest('.element')['dataset'].name);
        const node = DomHelpers.nodeFromString(el.html);

        this.dragEl = {node: node, element: el};
        this.renderer.setStyle(this.dragOverlay, 'display', 'block');
        this.livePreview.dragHelper.setElement(el);
        this.livePreview.dragHelper.show();
        this.livePreview.hideBox('selected');

        this.createDropPlaceholder();
    }

    protected handleDrag(e: HammerInput|any) {
        const scrollTop = this.livePreview.document.body.scrollTop,
              x = e.center.x,
              y = e.center.y + scrollTop;

        this.repositionDragMirror(y, x);

        //if we're not dragging over live preview yet, bail
        if (x <= 320) return;

        let under = this.livePreview.getElementFromPoint(x - 320, y);

        this.scroller.scroll(y);

        return this.repositionDropPlaceholder(under, x - 320, y);
    }

    /**
     * Append element user is currently dragging to the element users cursor is under.
     */
    protected repositionDropPlaceholder(node: HTMLElement, x: number, y: number) {
        if ( ! node) return;

        //check if we're not trying to drop a node inside its child or itself
        if (this.dragEl.node == node || this.dragEl.node.contains(node)) return;

        for (let i = 0, len = node.children.length; i < len; i++) {
            const child = node.children[i] as HTMLElement;

            //If cursor is above any of the specified node's children
            //and we can insert element as specified node's child,
            //insert element before child that cursor is currently above and bail
            if (DomHelpers.coordinatesAboveNode(child, x, y) && this.elements.canInsert(node, this.dragEl.element)) {
                return node.insertBefore(this.dropPlaceholder, child);
            }
        }

        //if user's cursor is not above any children on the node we'll
        //just append active element to the node
        if (this.elements.canInsert(node, this.dragEl)) {
            node.appendChild(this.dropPlaceholder);
        }
    }

    protected handleDragEnd(e: HammerInput|any) {
        this.scroller.stopScrolling();
        this.livePreview.dragging = false;

        this.dropPlaceholder.parentNode.replaceChild(this.dragEl.node, this.dropPlaceholder);
        this.dropPlaceholder.remove();
        this.dropPlaceholder = null;

        this.livePreview.dragHelper.hide();
        this.renderer.setStyle(this.dragOverlay, 'display', 'none');

        this.livePreview.selectNode(this.dragEl.node);
    }

    /**
     * Position drag mirror at specified coordinates.
     */
    protected repositionDragMirror(y: any, x: number) {
        this.livePreview.dragHelper.reposition(y, x);
    }


    protected createDropPlaceholder() {
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
