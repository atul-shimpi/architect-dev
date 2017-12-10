import {ElementRef, Injectable, NgZone} from '@angular/core';
import {Template} from "../../types/models/Template";
import {Elements} from "./elements/elements.service";
import {ActiveElement} from "./live-preview/active-element";
import {UndoManager} from "./undo-manager/undo-manager.service";
import {DragVisualHelperComponent} from "./live-preview/drag-and-drop/drag-visual-helper/drag-visual-helper.component";
import {InlineTextEditor} from "./live-preview/inline-text-editor/inline-text-editor.service";
import {ActiveProject} from "./projects/active-project";
import {ContextMenu} from "vebto-client/core/ui/context-menu/context-menu.service";
import {LivePreviewContextMenuComponent} from "./live-preview/live-preview-context-menu/live-preview-context-menu.component";
import {Overlay} from "@angular/cdk/overlay";
import {CodeEditor} from "./live-preview/code-editor/code-editor.service";
import {Keybinds} from "vebto-client/core/keybinds/keybinds.service";
import {SelectedElement} from "./live-preview/selected-element.service";
import {ContextBoxes} from "./live-preview/context-boxes.service";
import {BuilderDocument} from "./builder-document.service";
import {LivePreviewDocument} from "./live-preview/live-preview-document.service";

@Injectable()
export class LivePreview {
    dragging: any;

    public hover = new ActiveElement();

    public dragHelper: DragVisualHelperComponent;

    constructor(
        private zone: NgZone,
        private elements: Elements,
        private codeEditor: CodeEditor,
        private undoManager: UndoManager,
        private inlineTextEditor: InlineTextEditor,
        private parsedProject: ActiveProject,
        private contextMenu: ContextMenu,
        private overlay: Overlay,
        private keybinds: Keybinds,
        public selected: SelectedElement,
        private contextBoxes: ContextBoxes,
        private builderDocument: BuilderDocument,
        private previewDocument: LivePreviewDocument,
    ) {}

    public init(dragHelper: DragVisualHelperComponent) {
        this.dragHelper = dragHelper;

        this.registerKeybinds();
        this.bindToIframeEvents();
        this.bindToUndoCommandExecuted();
        this.reload();

        //make sure we only update live preview, if the changes did not originate from here
        this.builderDocument.contentChanged.subscribe(source => {
            if (source !== 'livePreview') this.reload();
        });
    }

    private bindToUndoCommandExecuted() {
        this.undoManager.executedCommand.subscribe(() => {
            this.repositionBox('selected');
            this.hideBox('hover');
        });
    }

    private bindToIframeEvents() {
        this.zone.runOutsideAngular(() => {
            const hammer = new Hammer.Manager(this.previewDocument.get()),
                singleTap = new Hammer.Tap({event: 'single_tap'}),
                doubleTap = new Hammer.Tap({event: 'double_tap', taps: 2});

            hammer.add([doubleTap, singleTap]);
            doubleTap.recognizeWith(singleTap);

            this.listenForHover();
            this.listenForClick(hammer);
            this.listenForDoubleClick(hammer);
            this.keybinds.listenOn(this.previewDocument.get());

            this.previewDocument.on('contextmenu', e => {
                e.preventDefault();

                this.zone.run(() => {
                    this.selected.selectNode(e.target as HTMLElement);
                    this.contextMenu.open(LivePreviewContextMenuComponent, e, {offsetX: 380, overlay: this.overlay});
                });
            });

            this.previewDocument.on('scroll', e => {
                this.contextBoxes.hideBox('hover');
                if (this.selected.node) this.repositionBox('selected');
                this.inlineTextEditor.close();
                this.contextMenu.close();
            }, true);
        });
    }

    private registerKeybinds() {
        this.keybinds.add('ctrl+shift+x', () => this.builderDocument.actions.cutNode(this.selected.node));
        this.keybinds.add('ctrl+shift+c', () => this.builderDocument.actions.copyNode(this.selected.node));
        this.keybinds.add('ctrl+shift+v', () => this.builderDocument.actions.pasteNode(this.selected.node));
        this.keybinds.add('delete', () => this.builderDocument.actions.removeNode(this.selected.node));
        this.keybinds.add('ctrl+z', () => this.undoManager.undo());
        this.keybinds.add('ctrl+y', () => this.undoManager.redo());
        this.keybinds.addWithPreventDefault('arrow_up', () => this.builderDocument.actions.moveSelected('up'));
        this.keybinds.addWithPreventDefault('arrow_down', () => this.builderDocument.actions.moveSelected('down'));
    }

    public reload() {
        this.previewDocument.setInnerHtml(this.builderDocument.getInnerHtml());
    }

    private listenForHover() {
        this.previewDocument.on('mousemove', e => {
            if (this.dragging) return;

            const node = this.previewDocument.elementFromPoint(e.pageX, e.pageY - this.previewDocument.getScrollTop());

            if ( ! node || node === this.hover.node) return;

            this.hover.previous = this.hover.node;

            //hide hover box and bail if we're hovering over a selected node
            if (this.selected.node && this.selected.node == node) {
                return this.contextBoxes.hideBox('hover');
            }

            //make sure we don't select resize handles
            if (node.className.indexOf('ui-resizable-handle') == -1) {
                this.hover.node = node;

                this.hover.element = this.elements.match(this.hover.node, 'hover', true);

                if ( ! this.dragging) {
                    this.repositionBox('hover');
                }

                this.zone.run(() => {});
            }
        });
    }

    private listenForClick(hammer: HammerManager) {
        hammer.on('single_tap', e => {
            console.log('single');

            //prevent navigation via links
            if (e.target.matches('a, a *')) {
                e.preventDefault();
            }

            //hide context menu
            this.contextMenu.close();

            this.previewDocument.focus();

            if (this.selected.node == e.target) return true;

            let node = e.target;

            if (node.hasAttribute('contenteditable') || node.parentNode['hasAttribute']('contenteditable')) {
                return;
            }

            //hide wysiwyg toolbar when clicked outside it
            this.inlineTextEditor.close();

            //hide linker
            //this.linker.addClass('hidden');

            if (node.nodeName !== 'HTML') {
                this.zone.run(() => this.selected.selectNode(node));
            }
        });
    }

    private listenForDoubleClick(hammer: HammerManager) {
        hammer.on('double_tap', e => {
            console.log('double');
            const matched = this.elements.match(e.target);

            if (matched.canModify.indexOf('text') > -1 && matched.showWysiwyg) {
                this.hideBox('selected');
                this.zone.run(() => this.inlineTextEditor.open(e.target));
            }
        });
    }

    public repositionBox(name: 'hover'|'selected') {
        this.contextBoxes.repositionBox(name, this[name].node, this[name].element);
    };

    /**
     * Hide specified context box.
     */
    public hideBox(name: 'hover'|'selected') {
        this.contextBoxes.hideBox(name);
    }

    public getElementDisplayName(el: any, node: HTMLElement): string {
        return this.elements.getDisplayName(el, node);
    }
}
