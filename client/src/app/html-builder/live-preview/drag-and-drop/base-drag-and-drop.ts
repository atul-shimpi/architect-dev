import {DragVisualHelperComponent} from "./drag-visual-helper/drag-visual-helper.component";
import {Input, OnInit, Renderer2} from "@angular/core";
import {LivePreview} from "../../live-preview.service";
import {UndoManager} from "../../undo-manager/undo-manager.service";
import {Elements} from "../../elements/elements.service";
import {LivePreviewScroller} from "./live-preview-scroller";
import {ActiveElement} from "../active-element";
import commandParams from "../../undo-manager/undo-manager-types";

export abstract class BaseDragAndDrop implements OnInit {

    @Input() dragHandle: HTMLElement;
    @Input() dragOverlay: HTMLElement;
    @Input() dragHelper: HTMLElement;

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

    protected undoCommandParams: commandParams;

    protected oldX: number;

    /**
     * BaseDragAndDrop Constructor.
     */
    constructor(
        protected livePreview: LivePreview,
        protected renderer: Renderer2,
        protected undoManager: UndoManager,
        protected elements: Elements,
    ) {}

    ngOnInit() {
        //this.initHammer();
        this.dragOverlay = document.querySelector('.drag-overlay') as HTMLElement;
        this.scroller = new LivePreviewScroller(this.livePreview.document, this.livePreview.container);
    }

    protected abstract handleDragStart(e: HammerInput);
    protected abstract handleDrag(e: HammerInput);
    protected abstract handleDragEnd(e: HammerInput);

    // /**
    //  * Init hammer manager and bind drag events.
    //  */
    // protected initHammer() {
    //     let hammer = new Hammer.Manager(this.dragHandle);
    //     let pan = new Hammer.Pan({direction: Hammer.DIRECTION_ALL, threshold: 0});
    //     hammer.add([pan]);
    //
    //     hammer.on('panstart', e => this.handleDragStart(e));
    //     hammer.on('panmove', e => this.handleDrag(e));
    //     hammer.on('panend', e => this.handleDragEnd(e));
    // }
}
