import {AfterContentInit, ContentChildren, Directive, ElementRef, QueryList} from '@angular/core';
import {UndoManager} from "../../undo-manager/undo-manager.service";
import {LivePreview} from "../../live-preview.service";
import {LayoutPanel} from "./layout-panel.service";

@Directive({
    selector: '[reorderColumns]'
})
export class ReorderColumnsDirective implements AfterContentInit {
    @ContentChildren('columnHelper') columnHelpers: QueryList<ElementRef>;

    /**
     * ReorderColumnsDirective Constructor.
     */
    constructor(
        private undoManager: UndoManager,
        private livePreview: LivePreview,
        private layoutPanel: LayoutPanel
    ) {}

    ngAfterContentInit() {
        this.initHammer();
    }

    /**
     * Init hammer manager and bind drag events.
     */
    private initHammer() {
        this.columnHelpers.changes.subscribe(() => {
            this.columnHelpers.forEach(helper => {
                const helperEl = helper.nativeElement as HTMLElement;
                let oldNode: HTMLElement;

                let hammer = new Hammer.Manager(helperEl);
                let pan = new Hammer.Pan({direction: Hammer.DIRECTION_HORIZONTAL, threshold: 0});
                hammer.add([pan]);

                hammer.on('panstart', () => {
                    oldNode = this.layoutPanel.selectedRow.node.cloneNode(true) as HTMLElement;
                    this.handlePanStart(helperEl);
                });

                hammer.on('panmove', (e: HammerInput) => {
                    this.handlePanMove(e, helperEl);
                });

                hammer.on('panend', () => {
                    this.handlePanEnd(helperEl, oldNode);
                });
            })
        })
    }

    private handlePanStart(helperEl: HTMLElement) {
        helperEl.classList.add('dragging');
        this.layoutPanel.selectColumn(this.getColumnNode(helperEl.id));
    }

    private handlePanMove(e: HammerInput, helperEl: HTMLElement) {
        const el = document.elementFromPoint(e.center.x, e.center.y);

        if (el === helperEl || ! el.classList || ! el.classList.contains('column-helper')) return;

        if (e.direction === Hammer.DIRECTION_LEFT) {
            helperEl['after'](el);
            this.getColumnNode(helperEl.id)['after'](this.getColumnNode(el.id));
        } else if (e.direction === Hammer.DIRECTION_RIGHT) {
            helperEl['before'](el);
            this.getColumnNode(helperEl.id)['before'](this.getColumnNode(el.id));
        }

        this.livePreview.repositionBox('selected');
    }

    private handlePanEnd(helperEl: HTMLElement, oldNode: HTMLElement) {
        helperEl.classList.remove('dragging');

        this.undoManager.add('domChanges', {
            oldNode: oldNode,
            newNode: this.layoutPanel.selectedRow.node.cloneNode(true) as HTMLElement,
            node: this.layoutPanel.selectedRow.node,
        });
    }

    private getColumnNode(id: string) {
        return this.layoutPanel.selectedRow.columns.find(col => col.id === id).node;
    }
}
