export default interface commandParams {
    node?: HTMLElement,
    undoParent?: Node,
    redoParent?: Node,
    parentContents?: NodeList,
    undoIndex?: number,
    redoIndex?: number,
    undo?: Function,
    redo?: Function,
}