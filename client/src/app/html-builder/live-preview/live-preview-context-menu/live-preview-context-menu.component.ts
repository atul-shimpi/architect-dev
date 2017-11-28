import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatMenuTrigger} from "@angular/material";
import {UndoManager} from "../../undo-manager/undo-manager.service";
import {LivePreview} from "../../live-preview.service";
import {SelectedElement} from "../selected-element.service";

@Component({
    selector: 'live-preview-context-menu',
    templateUrl: './live-preview-context-menu.component.html',
    styleUrls: ['./live-preview-context-menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LivePreviewContextMenuComponent {
    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
    @ViewChild('contextMenu') contextMenu;

    /**
     * LivePreviewContextMenuComponent Constructor.
     */
    constructor(
        public undoManager: UndoManager,
        public livePreview: LivePreview,
        public selected: SelectedElement,
    ) {}

    ngOnInit() {
      //
    }

    public remove() {
        this.livePreview.removeNode(this.selected.node);
    }

    public undo() {
        this.undoManager.undo();
    }

    public redo() {
        this.undoManager.redo();
    }

    public copy() {
        this.livePreview.copyNode(this.selected.node);
    }

    public cut() {
        this.livePreview.cutNode(this.selected.node);
    }

    public paste() {
        this.livePreview.pasteNode(this.selected.node);
    }

    public canPaste() {
        return this.livePreview.copiedNode;
    }

    public duplicate() {
        this.livePreview.duplicateNode(this.selected.node);
    }

    public selectParent() {
        this.selected.selectParent();
    }

    public canSelectParent() {
        return this.selected.canSelectParent();
    }

    public canSelectChild() {
        return this.selected.canSelectChild();
    }

    public selectChild() {
        this.selected.selectFirstChild();
    }

    public viewSourceCode() {
        this.livePreview.viewSelectedNodeSourceCode()
    }

    public move(direction: 'up'|'down') {
        this.livePreview.moveSelected(direction);
    }
}
