import {Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import {Inspector} from "./inspector.service";
import {UndoManager} from "../undo-manager/undo-manager.service";
import {CodeEditor} from "../live-preview/code-editor/code-editor.service";
import {Projects} from "../projects/projects.service";
import {ParsedProject} from "../projects/parsed-project";
import {Toast} from "vebto-client/core/ui/toast.service";
import * as html2canvas from "html2canvas";
import {BuilderDocument} from "../builder-document.service";

@Component({
    selector: 'inspector',
    templateUrl: './inspector.component.html',
    styleUrls: ['./inspector.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class InspectorComponent implements OnInit {

    /**
     * InspectorComponent Constructor.
     */
    constructor(
        public inspector: Inspector,
        public undoManager: UndoManager,
        private codeEditor: CodeEditor,
        private projects: Projects,
        private activeProject: ParsedProject,
        private toast: Toast,
        private el: ElementRef,
        private builderDocument: BuilderDocument,
    ) {}

    ngOnInit() {
        this.codeEditor.registerOrigin(this.el);
    }

    /**
     * Toggle code editor visibility.
     */
    public toggleCodeEditor() {
        this.codeEditor.toggle();
    }

    /**
     * Save project on the server.
     */
    public saveProject() {
        html2canvas(this.builderDocument.getBody()).then(canvas => {
            console.log(canvas);
            this.projects.generateThumbnail(this.activeProject.get().id, canvas.toDataURL('image/png')).subscribe();

        });

        this.projects.update(this.activeProject.get().id, this.activeProject.getPayload()).subscribe(() => {
            this.toast.open('Project saved');
        });
    }
}
