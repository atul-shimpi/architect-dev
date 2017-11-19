export default interface commandParams {
    node?: HTMLElement,
    oldNode?: HTMLElement,
    newNode?: HTMLElement,
    undoParent?: Node,
    redoParent?: Node,
    parentContents?: NodeList,
    undoIndex?: number,
    redoIndex?: number,
    undo?: Function,
    redo?: Function,
}