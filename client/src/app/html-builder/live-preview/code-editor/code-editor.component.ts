import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {utils} from 'vebto-client/core';
import {Subject} from "rxjs/Subject";
import {ActiveProject} from "../../projects/active-project";
import {aceThemes} from "./ace-themes";
import {Observable} from "rxjs/Observable";
import {SelectedElement} from "../selected-element.service";
import {BuilderDocument} from "../../builder-document.service";
import htmlBeautify from 'html-beautify'

declare let ace: any;

@Component({
    selector: 'code-editor',
    templateUrl: './code-editor.component.html',
    styleUrls: ['./code-editor.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CodeEditorComponent implements OnInit {
    @ViewChild('editor') editorEl: ElementRef;

    private loading = false;

    private suppressChangeEvents = false;

    /**
     * Ace editor instance.
     */
    private editor;

    /**
     * Currently active editor theme.
     */
    public theme = 'chrome';

    public themes = aceThemes;

    private activeEditor: 'html'|'css'|'js' = 'html';

    private contentsChange = new Subject();

    /**
     * Subject for notifying the user that code editor should be closed.
     */
    private close = new Subject();

    /**
     * Subject for notifying the user that code editor has finished loading.
     */
    private loaded = new Subject();

    constructor(
        private utils: utils,
        private activeProject: ActiveProject,
        private selectedElement: SelectedElement,
        private builderDocument: BuilderDocument,
    ) {}

    ngOnInit() {
        this.initEditor().then(() => {
            this.updateEditorContents(this.activeEditor);

            //select node html in the code editor when new node is selected in the builder
            this.selectedElement.changed.subscribe(() => {
                if (this.selectedElement.node) this.selectNodeSource(this.selectedElement.node);
            });

            this.bindToBuilderDocumentChangeEvent();
            this.bindToEditorChangeEvent();

            setTimeout(() => {
                this.loaded.next(this);
                this.loaded.complete();
            });
        });
    }

    /**
     * Gets an observable that emits when code editor has finished loading.
     */
    public afterLoaded(): Observable<any> {
        return this.loaded.asObservable();
    }

    /**
     * Gets an observable that emits when code editor should be closed.
     */
    public onClose(): Observable<any> {
        return this.close.asObservable();
    }

    /**
     * Select source code of specified node in code editor.
     */
    public selectNodeSource(node: HTMLElement) {
        this.editor.find(node.outerHTML);
    }

    public useTheme(name: string) {
        this.editor.setTheme('ace/theme/'+name);
    }

    public switchType(name: 'html'|'css'|'js') {
        this.activeEditor = name;
        this.changeEditorMode(name);
        this.updateEditorContents(name);
    }

    /**
     * Update editor contents with specified content type.
     */
    private updateEditorContents(type: "html"|"css"|"js") {
        if (type === 'html') {
            this.setEditorValue(htmlBeautify(this.builderDocument.getOuterHtml()));
        } else if (type === 'css') {
            this.setEditorValue(this.activeProject.get().css);
        } else if (type === 'js') {
            this.setEditorValue(this.activeProject.get().js);
        }
    }

    /**
     * Update project html when code editor contents are changed by user.
     */
    private bindToEditorChangeEvent() {
        this.contentsChange.debounceTime(500).subscribe(() => {
            let shouldReload = false;

            if (this.activeEditor === 'html') {
                this.builderDocument.setHtml(this.editor.getValue(), 'codeEditor');
            } else if (this.activeEditor === 'css') {
                this.activeProject.get().css = this.editor.getValue();
                shouldReload = true;
            } else if (this.activeEditor === 'js') {
                this.activeProject.get().js = this.editor.getValue();
                shouldReload = true;
            }

            if ( ! shouldReload) return;

            //reload custom css and js links, so changes are reflected in preview
            this.activeProject.save({thumbnail: false}).subscribe(() => {
                this.builderDocument.contentChanged.next('codeEditor');
            });
        });
    }

    /**
     * Update code editor contents when live preview html is changed.
     */
    private bindToBuilderDocumentChangeEvent() {
        this.builderDocument.contentChanged
            .debounceTime(500)
            .subscribe(source => {
                //if dom change was initiated by code editor, bail to avoid infinite loops
                if (source === 'codeEditor') return;
                this.updateEditorContents(this.activeEditor);
            });
    }

    private setEditorValue(value: string) {
        this.suppressChangeEvents = true;

        if (this.editor.getValue() !== value) {
            this.editor.setValue(value, -1);
        }

        this.suppressChangeEvents = false;
    }

    public activeTypeIs(name: 'html'|'css'|'js') {
        return this.activeEditor === name;
    }

    public closeEditor() {
        this.close.next();
        this.close.complete();
    }

    /**
     * Initiate code editor with specified contents.
     */
    private initEditor(language: 'js'|'html'|'css' = 'html') {
        this.loading = true;

        return this.utils.loadScript('assets/js/ace/ace.js').then(() => {
            this.editor = ace.edit(this.editorEl.nativeElement);
            this.changeEditorMode(language);
            this.useTheme('chrome');
            this.editor.$blockScrolling = Infinity;
            this.loading = false;

            this.editor.on('change', () => {
                if (this.suppressChangeEvents) return;
                this.contentsChange.next();
            });
        });
    }

    private changeEditorMode(mode: 'js'|'html'|'css') {
        mode = mode === 'js' ? 'javascript' : mode as any;
        this.editor.getSession().setMode('ace/mode/'+mode);
    }
}
