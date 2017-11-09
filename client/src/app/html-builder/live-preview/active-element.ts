export class ActiveElement {

    constructor() {

    }

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
    }

    public getStyle(name: string) {
        return window.getComputedStyle(this.node)[name];
    }
}