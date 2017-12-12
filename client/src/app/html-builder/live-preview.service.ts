import {ElementRef, Injectable, NgZone} from '@angular/core';
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

@Injectable()
export class LivePreview {
    dragging: any;

    public hover = new ActiveElement();

    public dragHelper: DragVisualHelperComponent;

    private iframe: HTMLIFrameElement;

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
        public contextBoxes: ContextBoxes,
        private builderDocument: BuilderDocument,
        private activeProject: ActiveProject,
    ) {}

    public init(dragHelper: DragVisualHelperComponent, iframe: ElementRef) {
        this.dragHelper = dragHelper;
        this.iframe = iframe.nativeElement;

        this.iframe.src = this.activeProject.getBaseUrl();

        this.iframe.onload = () => {
            console.log('iframe loaded');
            this.builderDocument.setBaseUrl(this.activeProject.getBaseUrl());
            this.builderDocument.init(this.iframe.contentDocument);
            this.registerKeybinds();
            this.bindToIframeEvents();
            this.bindToUndoCommandExecuted();

            this.builderDocument.get().addEventListener('click', e => {
                const node = e.target as HTMLElement;

                //clicked node is not a link
                if ( ! node.matches('a, a *')) return;

                e.preventDefault();
                e.stopPropagation();

                //get relative url of for the link
                const link = node as HTMLLinkElement,
                    href = link.href.replace(this.activeProject.getBaseUrl(), '');

                //link just scrolls to a node on the page, bail
                if (href.indexOf('#') === 0) return;

                //link navigates to an external site, bail
                if (href.indexOf('//') > -1) return;

                //link navigates to a different page
                const pageName = href.replace('.html', '');
                this.activeProject.setActivePage(this.activeProject.getPage(pageName));
            }, true);
        };
    }

    private bindToUndoCommandExecuted() {
        this.undoManager.executedCommand.subscribe(() => {
            this.repositionBox('selected');
            this.hideBox('hover');
        });
    }

    private bindToIframeEvents() {
        this.zone.runOutsideAngular(() => {
            const hammer = new Hammer.Manager(this.builderDocument.get()),
                singleTap = new Hammer.Tap({event: 'single_tap'}),
                doubleTap = new Hammer.Tap({event: 'double_tap', taps: 2});

            hammer.add([doubleTap, singleTap]);
            doubleTap.recognizeWith(singleTap);

            this.listenForHover();
            this.listenForClick(hammer);
            this.listenForDoubleClick(hammer);
            this.keybinds.listenOn(this.builderDocument.get());

            this.builderDocument.on('contextmenu', e => {
                e.preventDefault();

                this.zone.run(() => {
                    this.selected.selectNode(e.target as HTMLElement);
                    this.contextMenu.open(LivePreviewContextMenuComponent, e, {offsetX: 380, overlay: this.overlay});
                });
            });

            this.builderDocument.on('scroll', e => {
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

    private listenForHover() {
        this.builderDocument.on('mousemove', e => {
            if (this.dragging) return;

            const node = this.builderDocument.elementFromPoint(e.pageX, e.pageY - this.builderDocument.getScrollTop());

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
            //hide context menu
            this.contextMenu.close();

            this.builderDocument.focus();

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
