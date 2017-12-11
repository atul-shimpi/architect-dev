import {Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import {Inspector} from "./inspector.service";
import {UndoManager} from "../undo-manager/undo-manager.service";
import {CodeEditor} from "../live-preview/code-editor/code-editor.service";
import {Projects} from "../projects/projects.service";
import {ActiveProject} from "../projects/active-project";
import {Toast} from "vebto-client/core/ui/toast.service";

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
        public activeProject: ActiveProject,
        private toast: Toast,
        private el: ElementRef,
    ) {}

    ngOnInit() {
        this.codeEditor.setOrigin(this.el);
        this.inspector.elementRef = this.el;
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
        this.activeProject.save().subscribe(() => {
            this.toast.open('Project saved');
        });
    }

    /**
     * Open active project preview in new window.
     */
    public openPreview() {
        this.activeProject.save().subscribe(() => {
            window.open(this.activeProject.getSiteUrl(), '_blank');
        });
    }
}
