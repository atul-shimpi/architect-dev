import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatMenuTrigger} from "@angular/material";
import {UndoManager} from "../../undo-manager/undo-manager.service";
import {LivePreview} from "../../live-preview.service";
import {ContextMenu} from "vebto-client/core/ui/context-menu/context-menu.service";

@Component({
    selector: 'live-preview-context-menu',
    templateUrl: './live-preview-context-menu.component.html',
    styleUrls: ['./live-preview-context-menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LivePreviewContextMenuComponent {
    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

    /**
     * LivePreviewContextMenuComponent Constructor.
     */
    constructor(
        public undoManager: UndoManager,
        public livePreview: LivePreview,
        private contextMenu: ContextMenu
    ) {}

    public remove() {
        this.livePreview.removeNode(this.livePreview.selected.node);
        this.contextMenu.close();
    }

    public undo() {
        this.undoManager.undo();
        this.contextMenu.close();
    }

    public redo() {
        this.undoManager.redo();
        this.contextMenu.close();
    }

}
