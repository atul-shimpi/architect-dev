export class ActiveElement {
    public element: any;

    public node: HTMLElement;

    public previous: HTMLElement;

    public path: {node: HTMLElement, name: string}[];

    public parent: HTMLElement;

    public parentContents?: NodeList;

    public locked?: boolean;

    public isImage: boolean = false;
}