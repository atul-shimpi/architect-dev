import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {baseFonts, fontWeights} from "../../text-style-values";
import {LivePreview} from "../../live-preview.service";
import {fontAwesomeIconsList} from "../../font-awesome-icons-list";
import {Settings} from "vebto-client/core";
import {DomHelpers} from "../../dom-helpers.service";
import {UndoManager} from "../../undo-manager/undo-manager.service";
import {InlineTextEditor} from "./inline-text-editor.service";

@Component({
    selector: 'inline-text-editor',
    templateUrl: './inline-text-editor.component.html',
    styleUrls: ['./inline-text-editor.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class InlineTextEditorComponent implements OnInit, OnDestroy {

    /**
     * Styles for rendering editor toolbar selects.
     */
    public styles = {
        fonts: baseFonts,
        weights: fontWeights,
        sizes: [1,2,3,4,5,6,7],
        icons: fontAwesomeIconsList
    };

    /**
     * Model for link panel input field.
     */
    public linkModel: string;

    /**
     * Whether link panel is currently open.
     */
    public linkPanelIsOpen: boolean;

    /**
     * Whether icons panel is currently open.
     */
    public iconsPanelIsOpen: boolean;

    /**
     * Parent of editable node before any changes were made to it.
     */
    private beforeDomNode: HTMLElement;

    /**
     * Whether any changes have been made with inline text editor.
     */
    private madeChanges: boolean = false;

    /**
     * Node that is being edited by the inline text editor.
     */
    private editedNode: HTMLElement;

    /**
     * InlineTextEditorComponent Constructor.
     */
    constructor(
        private livePreview: LivePreview,
        private settings: Settings,
        private undoManager: UndoManager,
        private inlineTextEditor: InlineTextEditor,
    ) {}

    ngOnInit() {
        this.editedNode = this.livePreview.document.querySelector('[contenteditable]') as HTMLElement;
        this.beforeDomNode = this.editedNode.parentNode.cloneNode(true) as HTMLElement;
    }

    ngOnDestroy() {
        this.makeNodesNotEditable();

        if ( ! this.madeChanges) return;
        this.undoManager.wrapDomChanges(this.editedNode.parentNode, null, {before: this.beforeDomNode});
        this.livePreview.emitContentChanged('domChanged');
    }

    /**
     * Execute specified command on current text selection.
     */
    public execCommand(command: string, value?: string) {
        this.madeChanges = true;
        this.livePreview.document.execCommand(command, null, value);
    }

    /**
     * Check if specified command is active on current text selection.
     */
    public commandIsActive(command: string) {
        return this.livePreview.document.queryCommandState(command);
    }

    /**
     * Create link from current text selection and link model.
     */
    public createLink() {
        this.execCommand('createLink', this.linkModel);
        this.linkModel = null;
        this.togglePanel('link');
    }

    /**
     * Insert specified icon instead of current text selection.
     */
    public insertIcon(icon: string) {
        this.execCommand('insertHtml', '<i class="'+icon+'"></i>');
        this.togglePanel('icons');
    }

    /**
     * Toggle visibility of specified panel.
     */
    public togglePanel(name: 'icons'|'link') {
        this[name+'PanelIsOpen']= !this[name+'PanelIsOpen'];
        if (name === 'icons') this.loadFontAwesome();
        setTimeout(() => this.inlineTextEditor.overlayRef.updatePosition());
    }

    /**
     * Remove "contenteditable" attribute from all nodes.
     */
    private makeNodesNotEditable() {
        let editable = this.livePreview.document.body.querySelectorAll('[contenteditable]');

        for (let i = editable.length - 1; i >= 0; i--) {
            editable[i].removeAttribute('contenteditable');
            editable[i]['blur']();
        }
    }

    /**
     * Load font awesome link into main document, if not already loaded.
     */
    private loadFontAwesome() {
        if (document.head.querySelector('#font-awesome')) return;

        document.head.appendChild(
            DomHelpers.createLink(this.settings.getBaseUrl(true)+'storage/css/font-awesome.min.css', 'font-awesome')
        );
    }
}
