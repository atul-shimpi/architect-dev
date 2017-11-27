import {ElementRef, Injectable, NgZone, Renderer2} from '@angular/core';
import {Template} from "../../types/models/Template";
import {Elements} from "./elements/elements.service";
import {Inspector} from "./inspector/inspector.service";
import {ActiveElement} from "./live-preview/active-element";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {UndoManager} from "./undo-manager/undo-manager.service";
import {DragVisualHelperComponent} from "./live-preview/drag-and-drop/drag-visual-helper/drag-visual-helper.component";
import {InlineTextEditor} from "./live-preview/inline-text-editor/inline-text-editor.service";
import {ParsedProject} from "./projects/parsed-project";
import {ContextMenu} from "vebto-client/core/ui/context-menu/context-menu.service";
import {LivePreviewContextMenuComponent} from "./live-preview/live-preview-context-menu/live-preview-context-menu.component";
import {Overlay} from "@angular/cdk/overlay";
import {CodeEditor} from "./live-preview/code-editor/code-editor.service";

@Injectable()
export class LivePreview {
    public container: HTMLElement;
    dragging: any;

    public hover = new ActiveElement(this);

    public selected = new ActiveElement(this);

    private renderer: Renderer2;

    private hoverBox: HTMLElement;
    private selectedBox: HTMLElement;

    public document: Document;

    private iframe: HTMLIFrameElement;

    public selecting = false;

    public dragHelper: DragVisualHelperComponent;

    /**
     * Fired when element is selected in the builder.
     */
    public elementSelected = new BehaviorSubject(null);

    /**
     * Fired when preview iframe contents change.
     */
    public contentChanged = new BehaviorSubject<{type: string, elementName?: string, node?: HTMLElement, initiator?: string}>({type: 'domReloaded'});

    public copiedNode: HTMLElement;

    constructor(
        private zone: NgZone,
        private elements: Elements,
        private inspector: Inspector,
        private codeEditor: CodeEditor,
        private undoManager: UndoManager,
        private inlineTextEditor: InlineTextEditor,
        private parsedProject: ParsedProject,
        private contextMenu: ContextMenu,
        private overlay: Overlay,
    ) {}

    public init(renderer: Renderer2, iframe: ElementRef, container: ElementRef, hoverBox: ElementRef, selectedBox: ElementRef, dragHelper: DragVisualHelperComponent) {
        this.document = iframe.nativeElement.contentWindow.document;
        this.iframe = iframe.nativeElement;
        this.hoverBox = hoverBox.nativeElement;
        this.selectedBox = selectedBox.nativeElement;
        this.renderer = renderer;
        this.container = container.nativeElement;
        this.dragHelper = dragHelper;

        this.bindToIframeEvents();

        this.undoManager.executedCommand.subscribe(() => {
            this.repositionBox('selected');
            this.hideBox('hover');
        })
    }

    private bindToIframeEvents() {
        this.zone.runOutsideAngular(() => {
            const hammer = new Hammer.Manager(this.document.body),
                singleTap = new Hammer.Tap({event: 'single_tap'}),
                doubleTap = new Hammer.Tap({event: 'double_tap', taps: 2});

            hammer.add([doubleTap, singleTap]);
            doubleTap.recognizeWith(singleTap);

            this.listenForHover();
            this.listenForClick(hammer);
            this.listenForDoubleClick(hammer);

            this.document.body.addEventListener('contextmenu', e => {
                e.preventDefault();

                this.zone.run(() => {
                    this.selectNode(e.target as HTMLElement);
                    this.contextMenu.open(LivePreviewContextMenuComponent, e, {offsetX: 380, overlay: this.overlay});
                });
            });

            this.document.addEventListener('scroll', e => {
                this.hideBox('hover');
                if (this.selected.node) this.repositionBox('selected');
                this.inlineTextEditor.close();
                this.contextMenu.close();
            }, true);
        });
    }

    public emitContentChanged(type: string, element?: string, node?: HTMLElement, initiator: string = 'visual-builder') {
        this.contentChanged.next({type: type, elementName: element, node: node, initiator: initiator});

        if (type !== 'domReloaded') {
            this.parsedProject.setHtml(this.document.documentElement.innerHTML);
        }
    }

    public applyTemplate(template: Template) {
        this.parsedProject.applyTemplate(template);
        this.reload();
    }

    public reload(initiator: string = 'visual-builder') {
        this.iframe.onload = () => {
            this.bindToIframeEvents();
            this.emitContentChanged('domReloaded', null, null, initiator);
        };

        this.document.open();
        this.document.write(this.parsedProject.getHtml());
        this.document.close();
    }

    public getElementFromPoint(x: number, y: number): HTMLElement {
        let el = this.document.elementFromPoint(x, y);

        //firefox returns html if body is empty,
        //IE doesn't work at all sometimes.
        if ( ! el || el.nodeName === 'HTML') {
            return this.document.body[0];
        }

        return el as HTMLElement;
    };

    /**
     * Clone specified node inside the project.
     */
    public cloneNode(node: HTMLElement): HTMLElement {
        const cloned = node.cloneNode(true) as HTMLElement;

        this.undoManager.wrapDomChanges(node.parentNode, () => {
            node.parentNode.insertBefore(cloned, node.nextElementSibling);
            this.emitContentChanged('nodeAdded', this.elements.match(cloned).name, cloned);
        });

        return cloned as HTMLElement;
    }

    /**
     * Delete specified node from the project.
     */
    public removeNode(node: HTMLElement): HTMLElement {
        this.undoManager.wrapDomChanges(node.parentNode, () => {
            if (this.selected.node === node) this.selected.selectParent();
            node.parentNode.removeChild(node);
            this.emitContentChanged('nodeRemoved', this.elements.match(node).name, node);
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
            this.emitContentChanged('nodeAdded');
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
                    parentParent.insertBefore(this.selected.node, this.selected.parent);
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
        this.renderer.listen(this.document.body, 'mousemove', e => {
            if (this.dragging) return;

            const node = this.getElementFromPoint(e.pageX, e.pageY - this.document.documentElement.scrollTop);
            if ( ! node || node === this.hover.node) return;

            this.hover.previous = this.hover.node;

            //hide hover box and bail if we're hovering over a selected node
            if (this.selected.node && this.selected.node == node) {
                return this.renderer.addClass(this.hoverBox, 'hidden');
            }

            //make sure we don't select resize handles
            if (node.className.indexOf('ui-resizable-handle') == -1) {
                this.hover.node = node;

                this.hover.element = this.elements.match(this.hover.node, 'hover', true);

                if ( ! this.dragging) {
                    this.repositionBox('hover', this.hover.node, this.hover.element);
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

            this.iframe.contentWindow.focus();

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
                this.zone.run(() => this.selectNode(node));
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

    /**
     * Select specified node as active one in the builder.
     */
    public selectNode(node: HTMLElement|number, openInspector = true) {
        this.selecting = true;

        this.selected.previous = this.selected.node;

        //if we get passed an integer instead of a dom node we'll
        //select a node at that index in the currently stored path
        if (typeof node === 'number') {
            node = this.selected.path[node].node;
        }

        //if we haven't already stored a reference to passed in node, do it now
        if (node && this.selected.node !== node) {
            this.selected.node = node as HTMLElement;
        }

        //cache some more references about the node for later use
        this.selected.element = this.elements.match(this.selected.node, 'select', true);
        this.selected.parent = this.selected.node.parentNode as HTMLElement;
        this.selected.parentContents = this.selected.parent.childNodes;

        //position select box on top of the newly selected node
        this.repositionBox('selected');

        //whether or not the new node is locked
        this.selected.locked = this.selected.node.className.indexOf('locked') > -1;
        this.selected.isImage = this.selected.node.nodeName == 'IMG' &&
            this.selected.node.className.indexOf('preview-node') === -1;

        //create an array from all parents of this node
        let el = this.selected.node;
        this.selected.path = [];
        while (el.nodeType === Node.ELEMENT_NODE && el.nodeName.toLowerCase() !== 'body') {
            this.selected.path.unshift({node: el, name: this.getElementDisplayName(this.elements.match(el), el)});
            el = el.parentNode as HTMLElement;
        }

        //whether or not this node is a column
        //this.selected.isColumn = grid.isColumn(this.selected.node);

        this.selected.hasInlineStyles = this.selected.node.style[0] !== null;

        if (openInspector) {
            this.inspector.togglePanel('inspector');
        }

        setTimeout(() => {
            this.selecting = false;
        }, 200);

        this.elementSelected.next(this.selected);
    };

    public repositionBox(name: 'hover'|'selected', node?, el?) {

        //hide context boxes depending on user settings
        // if (! settings.get('enable'+name.ucFirst()+'Box')) {
        //     return $scope[name+'Box'].hide();
        // }

        if ( ! node) node = this[name].node;

        if (node && node.nodeName == 'BODY') {
            return this.hideBox(name);
        }

        if ( ! el) el = this.elements.match(node, name);

        if ( ! el) return true;

        this[name].element = el;

        if (name === 'selected') {
            this.hideBox('hover');
        }

        const rect = node.getBoundingClientRect();

        if ( ! rect.width || ! rect.height) {
            this.hideBox(name);
        } else {
            this.renderer.setStyle(this[name+'Box'], 'top', rect.top+'px');
            this.renderer.setStyle(this[name+'Box'], 'left', rect.left+'px');
            this.renderer.setStyle(this[name+'Box'], 'height', rect.height+'px');
            this.renderer.setStyle(this[name+'Box'], 'width', rect.width+'px');

            //this[name+'BoxTag'].textContent = $translate.instant(el.name);

            this.renderer.removeClass(this[name+'Box'], 'hidden');
        }
    };

    /**
     * Hide specified context box.
     */
    public hideBox(name: 'hover'|'selected') {
        this.renderer.addClass(this[name+'Box'], 'hidden');
    }

    public getElementDisplayName(el: any, node: HTMLElement) {
        if ( ! el) return;

        if (el.name === 'div container') {
            if (node.id) {
                return node.id
            } else if (node.classList[0]) {
                return node.classList[0];
            } else {
                return el.name
            }
        } else {
            return el.name;
        }
    }
}
