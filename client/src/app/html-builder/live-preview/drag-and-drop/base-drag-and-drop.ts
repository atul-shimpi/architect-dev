import {DragVisualHelperComponent} from "./drag-visual-helper/drag-visual-helper.component";
import {AfterContentInit, ElementRef, Input, NgZone, QueryList, Renderer2} from "@angular/core";
import {LivePreview} from "../../live-preview.service";
import {UndoManager} from "../../undo-manager/undo-manager.service";
import {Elements} from "../../elements/elements.service";
import {LivePreviewScroller} from "./live-preview-scroller";
import {DomHelpers} from "../../dom-helpers.service";

export abstract class BaseDragAndDrop implements AfterContentInit {

    @Input() protected dragOverlay: HTMLElement;

    protected dragHelper: DragVisualHelperComponent;

    /**
     * Helper service for scrolling preview during drag and drop.
     */
    protected scroller: LivePreviewScroller;

    /**
     * Placeholder helper for element that is being dragged.
     */
    protected dropPlaceholder: HTMLElement;

    /**
     * Element that is being dragged currently.
     */
    protected dragEl: {element: any, node: HTMLElement};

    protected bodyBeforeDrag: HTMLBodyElement;

    protected abstract dragElements: QueryList<ElementRef>;

    protected abstract livePreview: LivePreview;

    protected abstract zone: NgZone;

    protected abstract renderer: Renderer2;

    protected abstract undoManager: UndoManager;

    protected abstract elements: Elements;

    ngAfterContentInit() {
        this.dragOverlay = document.querySelector('.drag-overlay') as HTMLElement;
        this.dragHelper = this.livePreview.dragHelper;
        this.scroller = new LivePreviewScroller(this.livePreview.document, this.livePreview.container);

        this.zone.runOutsideAngular(() => {
            this.initHammer(this.dragElements.toArray());
        });
    }

    protected sortColumns?(node: HTMLElement, e: HammerInput);

    protected abstract setDragElement(e: HammerInput);

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
        this.bodyBeforeDrag = this.livePreview.document.body.cloneNode(true) as HTMLBodyElement;

        this.livePreview.dragging = true;
        this.livePreview.hideBox('selected');
        this.livePreview.hideBox('hover');

        this.setDragElement(e);

        this.renderer.setStyle(this.dragOverlay, 'display', 'block');

        this.dragHelper.show(this.dragEl.element);

        if (this.dragEl.element.name !== 'column') {
            this.renderer.setAttribute(this.dragEl.node, 'data-display', this.dragEl.node.style.display);
            this.createDropPlaceholder();
            this.renderer.setStyle(this.dragEl.node, 'display', 'none');
        }
    }

    protected handleDrag(e: HammerInput) {
        const scrollTop = this.livePreview.document.body.scrollTop,
            x = e.center.x,
            y = e.center.y + scrollTop;

        this.repositionDragMirror(y, x);

        //if we're not dragging over live preview yet, bail
        if (x <= 380) return;

        let under = this.livePreview.getElementFromPoint(x - 380, y);

        this.scroller.scroll(y);

        const classes = this.dragEl.node.className;

        if (classes && classes.match('col-')) {
            return this.sortColumns && this.sortColumns(under, e);
        } else {
            return this.repositionDropPlaceholder(under, x - 380, y);
        }
    }

    protected handleDragEnd(e: HammerInput) {
        this.scroller.stopScrolling();
        this.livePreview.dragging = false;

        this.dragHelper.hide();
        this.renderer.setStyle(this.dragOverlay, 'display', 'none');

        if (this.dragEl.element.name !== 'column') {
            this.dropPlaceholder.parentNode.replaceChild(this.dragEl.node, this.dropPlaceholder);
            this.renderer.setStyle(this.dragEl.node, 'display', this.dragEl.node.getAttribute('data-display'));
            this.renderer.removeAttribute(this.dragEl.node, 'data-display');
            this.dropPlaceholder.remove();
            this.dropPlaceholder = null;
        }

        this.livePreview.selectNode(this.dragEl.node);

        this.undoManager.wrapDomChanges(this.livePreview.document.body, null, {before: this.bodyBeforeDrag});
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
        if (this.elements.canInsert(node, this.dragEl.element)) {
            node.appendChild(this.dropPlaceholder);
        }
    }

    /**
     * Position drag mirror at specified coordinates.
     */
    protected repositionDragMirror(y: any, x: number) {
        this.dragHelper.reposition(y, x);
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
