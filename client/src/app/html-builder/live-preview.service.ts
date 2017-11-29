import {ElementRef, Injectable, NgZone} from '@angular/core';
import {Template} from "../../types/models/Template";
import {Elements} from "./elements/elements.service";
import {ActiveElement} from "./live-preview/active-element";
import {UndoManager} from "./undo-manager/undo-manager.service";
import {DragVisualHelperComponent} from "./live-preview/drag-and-drop/drag-visual-helper/drag-visual-helper.component";
import {InlineTextEditor} from "./live-preview/inline-text-editor/inline-text-editor.service";
import {ParsedProject} from "./projects/parsed-project";
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
    public container: HTMLElement;
    dragging: any;

    public hover = new ActiveElement();

    public dragHelper: DragVisualHelperComponent;

    public copiedNode: HTMLElement;

    constructor(
        private zone: NgZone,
        private elements: Elements,
        private codeEditor: CodeEditor,
        private undoManager: UndoManager,
        private inlineTextEditor: InlineTextEditor,
        private parsedProject: ParsedProject,
        private contextMenu: ContextMenu,
        private overlay: Overlay,
        private keybinds: Keybinds,
        public selected: SelectedElement,
        private contextBoxes: ContextBoxes,
        private document: BuilderDocument,
    ) {}

    public init(container: ElementRef, hoverBox: ElementRef, selectedBox: ElementRef, dragHelper: DragVisualHelperComponent) {
        this.contextBoxes.set(hoverBox.nativeElement, selectedBox.nativeElement);
        this.container = container.nativeElement;
        this.dragHelper = dragHelper;

        this.registerKeybinds();
        this.bindToIframeEvents();

        this.document.contentChanged.subscribe(params => {
            if (params.type !== 'domReloaded') {
                this.parsedProject.setHtml(this.document.getInnerHtml());
            }
        });

        this.undoManager.executedCommand.subscribe(() => {
            this.repositionBox('selected');
            this.hideBox('hover');
        })
    }

    private bindToIframeEvents() {
        this.zone.runOutsideAngular(() => {
            const hammer = new Hammer.Manager(this.document.getBody()),
                singleTap = new Hammer.Tap({event: 'single_tap'}),
                doubleTap = new Hammer.Tap({event: 'double_tap', taps: 2});

            hammer.add([doubleTap, singleTap]);
            doubleTap.recognizeWith(singleTap);

            this.listenForHover();
            this.listenForClick(hammer);
            this.listenForDoubleClick(hammer);
            this.keybinds.listenOn(this.document.get());

            this.document.on('contextmenu', e => {
                e.preventDefault();

                this.zone.run(() => {
                    this.selected.selectNode(e.target as HTMLElement);
                    this.contextMenu.open(LivePreviewContextMenuComponent, e, {offsetX: 380, overlay: this.overlay});
                });
            });

            this.document.on('scroll', e => {
                this.contextBoxes.hideBox('hover');
                if (this.selected.node) this.repositionBox('selected');
                this.inlineTextEditor.close();
                this.contextMenu.close();
            }, true);
        });
    }

    private registerKeybinds() {
        this.keybinds.add('ctrl+shift+x', () => this.cutNode(this.selected.node));
        this.keybinds.add('ctrl+shift+c', () => this.copyNode(this.selected.node));
        this.keybinds.add('ctrl+shift+v', () => this.pasteNode(this.selected.node));
        this.keybinds.add('delete', () => this.removeNode(this.selected.node));
        this.keybinds.add('ctrl+z', () => this.undoManager.undo());
        this.keybinds.add('ctrl+y', () => this.undoManager.redo());
        this.keybinds.addWithPreventDefault('arrow_up', () => this.moveSelected('up'));
        this.keybinds.addWithPreventDefault('arrow_down', () => this.moveSelected('down'));
    }

    public applyTemplate(template: Template) {
        this.parsedProject.applyTemplate(template);
        this.reload();
    }

    public reload(initiator: string = 'visual-builder') {
        this.document.on('load', () => {
            this.bindToIframeEvents();
            this.document.emitContentChanged('domReloaded', null, null, initiator);
        });

        this.document.write(this.parsedProject.getHtml());
    }

    /**
     * Clone specified node inside the project.
     */
    public cloneNode(node: HTMLElement): HTMLElement {
        const cloned = node.cloneNode(true) as HTMLElement;

        this.undoManager.wrapDomChanges(node.parentNode, () => {
            node.parentNode.insertBefore(cloned, node.nextElementSibling);
            this.document.emitContentChanged('nodeAdded', this.elements.match(cloned).name, cloned);
        });

        return cloned as HTMLElement;
    }

    /**
     * Delete specified node from the project.
     */
    public removeNode(node: HTMLElement): HTMLElement {
        if ( ! node) return;

        this.undoManager.wrapDomChanges(node.parentNode, () => {
            if (this.selected.node === node) this.selected.selectParent();
            node.parentNode.removeChild(node);
            this.document.emitContentChanged('nodeRemoved', this.elements.match(node).name, node);
        });

        return node;
    }

    /**
     * Copy specified node for later use or pasting.
     */
    public copyNode(node: HTMLElement) {
        if (node && node.nodeName != 'BODY') {
            this.copiedNode = node.cloneNode(true) as HTMLElement;
        }
    }

    /**
     * Paste copied DOM node if it exists.
     */
    public pasteNode(ref: HTMLElement, copiedNode?: HTMLElement) {
        if ( ! copiedNode) copiedNode = this.copiedNode;

        if (ref && copiedNode) {
            this.undoManager.wrapDomChanges(ref.parentNode, () => {
                //make sure we don't paste refs after body
                if (ref.nodeName == 'BODY') {
                    ref.appendChild(copiedNode);
                } else {
                    ref.parentNode.insertBefore(copiedNode, ref.nextSibling);
                }

                this.hideBox('selected');
            });

            //add undo
            this.document.emitContentChanged('nodeAdded');
        }
    }

    /**
     * Copy and remove the given node.
     */
    public cutNode(node: HTMLElement) {
        if (node && node.nodeName != 'BODY') {
            this.copyNode(node);
            this.removeNode(node);
        }
    }

    public duplicateNode(node: HTMLElement) {
        const cloned = node.cloneNode(true) as HTMLElement;
        this.pasteNode(this.selected.node, cloned);
    }

    public viewSelectedNodeSourceCode() {
        this.codeEditor.open().subscribe(editor => {
            editor.selectNodeSource(this.selected.node);
        });
    }

    /**
     * Move selected node by one element in the specified direction.
     */
    public moveSelected(dir: 'up'|'down') {
        if ( ! this.selected.node) return;

        if (dir == 'down') {
            const next = this.selected.node.nextElementSibling as HTMLElement;

            if (next) {
                //check if we can insert selected node into the next one
                if (this.elements.canInsert(next, this.selected.element)) {
                    next.insertBefore(this.selected.node, next.firstChild);
                } else {
                    next.parentNode.insertBefore(this.selected.node, next.nextElementSibling);
                }

            } else {
                let parentParent = this.selected.node.parentNode.parentNode as HTMLElement;

                if (this.elements.canInsert(parentParent, this.selected.element)) {
                    parentParent.parentNode.insertBefore(this.selected.node, parentParent.nextElementSibling);
                }
            }
        } else if (dir == 'up') {
            const prev = this.selected.node.previousElementSibling as HTMLElement;

            if (prev) {
                //check if we can insert selected node into the prev one
                if (this.elements.canInsert(prev, this.selected.element)) {
                    prev.appendChild(this.selected.node);
                } else {
                    prev.parentNode.insertBefore(this.selected.node, prev);
                }
            } else {
                let parentParent = this.selected.node.parentNode.parentNode as HTMLElement;

                if (this.elements.canInsert(parentParent, this.selected.element)) {
                    parentParent.insertBefore(this.selected.node, this.selected.node.parentNode);
                }
            }
        }

        this.repositionBox('selected');
    }

    public scrollIntoView(node?: HTMLElement) {
        if ( ! node) node = this.selected.node;
        if ( ! node) return;
        node.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
    }

    private listenForHover() {
        this.document.on('mousemove', e => {
            if (this.dragging) return;

            const node = this.document.elementFromPoint(e.pageX, e.pageY - this.document.getScrollTop());

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

            this.document.focus();

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
