import {LivePreview} from "../live-preview.service";

export class ActiveElement {

    constructor(private livePreview: LivePreview) {}

    public element: any;

    public node: HTMLElement;

    public previous: HTMLElement;

    public path: {node: HTMLElement, name: string}[];

    public parent: HTMLElement;

    public parentContents?: NodeList;

    public locked?: boolean;

    public isImage?: boolean;

    public hasInlineStyles?: boolean;

    public selectParent() {
        this.livePreview.selectNode(this.node.parentNode as HTMLElement);
    }

    public canSelectParent() {
        if ( ! this.livePreview.selected.node) return false;
        const parent = this.livePreview.selected.node.parentNode;
        return parent && parent.nodeName.toLowerCase() !== 'body';
    }

    public selectFirstChild() {
        this.livePreview.selectNode(this.node.firstChild as HTMLElement);
    }

    public canSelectChild() {
        if ( ! this.livePreview.selected.node) return false;
        return this.livePreview.selected.node.firstChild;
    }

    public deselect() {
        if (this.livePreview.selected.node !== this.node) return;

        this.livePreview.selected = new ActiveElement(this.livePreview);
        this.livePreview.hideBox('selected');
    }

    public applyStyle(name: string, value: string, addUndoCommand = true) {
        this.node.style[name] = value;
        this.livePreview.repositionBox('selected');
    }

    public getStyle(name: string) {
        return window.getComputedStyle(this.node)[name];
    }

    /**
     * Check if specified property/style of this element can be modified.
     */
    public canModify(property: string) {
        if ( ! this.element) return;
        return this.element.canModify.indexOf(property.toLowerCase()) > -1;
    }
}