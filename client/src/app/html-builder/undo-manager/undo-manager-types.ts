export default interface commandParams {
    node?: HTMLElement|Node,
    oldNode?: HTMLElement|Node,
    newNode?: HTMLElement|Node,
    undoParent?: Node,
    redoParent?: Node,
    parentContents?: NodeList,
    undoIndex?: number,
    redoIndex?: number,
    undo?: Function,
    redo?: Function,
}