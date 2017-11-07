export default interface ActiveElement {
    element: any,
    node: HTMLElement,
    previous: HTMLElement,
    path?: {node: HTMLElement, name: string}[],
    parent?: HTMLElement,
    parentContents?: NodeList,
    locked?: boolean,
    isImage?: boolean,
    hasInlineStyles?: boolean,
};