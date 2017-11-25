import {Component, ElementRef, ViewEncapsulation} from '@angular/core';
import {Inspector} from "./inspector.service";
import {UndoManager} from "../undo-manager/undo-manager.service";
import {CodeEditor} from "../live-preview/code-editor/code-editor.service";

@Component({
    selector: 'inspector',
    templateUrl: './inspector.component.html',
    styleUrls: ['./inspector.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class InspectorComponent {

    constructor(
        public inspector: Inspector,
        public undoManager: UndoManager,
        private codeEditor: CodeEditor,
        private el: ElementRef,
    ) {
    }

    public toggleCodeEditor() {
        this.codeEditor.toggle(this.el);
    }
}
