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
        return this.element.canModify.indexOf(property.toLowerCase()) > -1;
    }
}