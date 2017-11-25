import {Component, ElementRef, EventEmitter, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {utils} from 'vebto-client/core';
import {LivePreview} from "../../live-preview.service";
import {Subject} from "rxjs/Subject";
import {ParsedProject} from "../../projects/parsed-project";
import {aceThemes} from "./ace-themes";

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
     * Fired when editor should be closed.
     */
    private close = new EventEmitter();

    constructor(private utils: utils, private livePreview: LivePreview, private parsedProject: ParsedProject) {
    }

    ngOnInit() {
        this.initEditor().then(() => {
            this.updateEditorContents(this.activeEditor);

            //select node html in the code editor when new node is selected in the builder
            this.livePreview.elementSelected.subscribe(() => {
                if (this.livePreview.selected.node) this.editor.find(this.livePreview.selected.node.outerHTML);
            });

            this.bindToLivePreviewChangeEvent();
            this.bindToEditorChangeEvent();
        });
    }

    public useTheme(name: string) {
        this.editor.setTheme('ace/theme/'+name);
    }

    /**
     * Update code editor contents when live preview html is changed.
     */
    private bindToLivePreviewChangeEvent() {
        this.livePreview.contentChanged
            .debounceTime(500)
            .distinctUntilChanged()
            .subscribe(e => {
                //if dom change was initiated by code editor, bail to avoid infinite loops
                if (e.initiator === 'code-editor') return;
                this.updateEditorContents(this.activeEditor);
            });
    }

    /**
     * Update project html when code editor contents are changed by user.
     */
    private bindToEditorChangeEvent() {
        this.contentsChange.debounceTime(500).subscribe(() => {

            if (this.activeEditor === 'html') {
                this.parsedProject.setHtml(this.editor.getValue());
            } else if (this.activeEditor === 'css') {
                this.parsedProject.setCss(this.editor.getValue());
            } else if (this.activeEditor === 'js') {
                this.parsedProject.setJs(this.editor.getValue());
            }

            this.livePreview.reload('code-editor');
        });
    }

    public switchType(name: 'html'|'css'|'js') {
        this.activeEditor = name;
        this.changeEditorMode(name);
        this.updateEditorContents(name);
    }

    /**
     * Update editor contents with specified content type.
     */
    private updateEditorContents(type: "html" | "css" | "js") {
        if (type === 'html') {
            this.setEditorValue(this.parsedProject.getHtml());
        } else if (type === 'css') {
            this.setEditorValue(this.parsedProject.getCustomCss())
        } else if (type === 'js') {
            this.setEditorValue(this.parsedProject.getCustomJs())
        }
    }

    private setEditorValue(value: string) {
        this.suppressChangeEvents = true;
        this.editor.setValue(value, -1);
        this.suppressChangeEvents = false;
    }

    public activeTypeIs(name: 'html'|'css'|'js') {
        return this.activeEditor === name;
    }

    public closeEditor() {
        this.close.emit();
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
