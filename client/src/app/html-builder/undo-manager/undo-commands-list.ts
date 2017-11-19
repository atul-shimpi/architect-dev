import commandParams from "./undo-manager-types";

type commandInterface = {undo: Function, redo: Function};

export class UndoCommandsList {

    public static generic(params: commandParams) {
        return {
            undo: params.undo,
            redo: params.redo,
        }
    }

    /**
     * Command for undoing/redoing dom node reordering.
     */
    public static reorderElement(params: commandParams): commandInterface {
        return {
            undo: () => UndoCommandsList.insertAtIndex('undo', params),
            redo: () => UndoCommandsList.insertAtIndex('redo', params),
        }
    }

    public static domChanges(params: commandParams) {
        return {
            undo: () => {
                params.node.parentNode.replaceChild(params.oldNode, params.node);
                params.node = params.oldNode;
            },
            redo: () => {
                params.node.parentNode.replaceChild(params.newNode, params.node);
                params.node = params.newNode;
            },
        }
    }

    // /**
    //  * Command for undoing/redoing dom node deletion.
    //  */
    // public deleteNode(params) {
    //     this.params = params;
    // }
    //
    // /**
    //  * Command for undoing/redoing new dom node insertion.
    //  */
    // public insertNode(params) {
    //     this.params = params;
    // }
    //
    // /**
    //  * Command for undoing/redoing new column insertion.
    //  */
    // public insertColumn(params) {
    //     this.params = params;
    // }
    //
    // /**
    //  * Command for undoing/redoing element style changes in inspector.
    //  */
    // public revertStyles(params: commandParams) {
    //     this.params = params;
    //
    //     css.add(this.params.path, this.params.property, this.params.oldStyles);
    //
    //     $rootScope.repositionBox('select');
    //     $rootScope.hoverBox.hide();
    // }
    //
    // /**
    //  * RevertStyles command redo action.
    //  *
    //  * @return void
    //  */
    // manager.revertStyles.prototype.redo = function() {
    //
    //     if (this.params.redoProps) {
    //         css.add(this.params.path, this.params.redoProps);
    //     } else {
    //         css.add(this.params.path, this.params.property, this.params.newStyles);
    //     }
    //
    //     $rootScope.repositionBox('select');
    //     $rootScope.hoverBox.hide();
    // };
    //
    // /**
    //  * DeleteNode command undo action.
    //  *
    //  * @return void
    //  */
    // manager.deleteNode.prototype.undo = function() {
    //     this.insertAtIndex = manager.reorderElement.prototype.insertAtIndex;
    //     this.insertAtIndex();
    // };
    //
    // /**
    //  * DeleteNode command redo action.
    //  *
    //  * @return void
    //  */
    // manager.deleteNode.prototype.redo = function() {
    //     this.params.node.remove();
    //     $rootScope.selectBox.hide();
    //     $rootScope.hoverBox.hide();
    // };
    //
    // /**
    //  * InsertNode command undo action.
    //  *
    //  * @return void
    //  */
    // manager.insertNode.prototype.undo = function() {
    //     if (this.params.node) {
    //         $(this.params.node).remove();
    //         $rootScope.selectBox.hide();
    //         $rootScope.hoverBox.hide();
    //     }
    // };
    //
    // manager.insertColumn.prototype.undo = function() {
    //     this.params.node.remove();
    //     this.params.resize(this.params.oldNode, '+', 1);
    //
    //     $rootScope.selectBox.hide();
    //     $rootScope.hoverBox.hide();
    // };
    //
    // manager.insertColumn.prototype.redo = function() {
    //     this.insertAtIndex = manager.reorderElement.prototype.insertAtIndex;
    //     this.insertAtIndex();
    //     this.params.resize(this.params.oldNode, '-', 1);
    // };
    //
    // /**
    //  * InsertNode command redo action.
    //  *
    //  * @return void
    //  */
    // manager.insertNode.prototype.redo = function() {
    //     this.insertAtIndex = manager.reorderElement.prototype.insertAtIndex;
    //     this.insertAtIndex();
    // };

    /**
     * Insert node at given index in the parent.
     */
    private static insertAtIndex(type: 'undo'|'redo', params: commandParams) {
        let before = true, parent = params[type+'Parent'];

        //we'll need to use different index if we're undoing or redoing the insert
        let index = type === 'redo' ? params.redoIndex : params.undoIndex;

        //if index is zero just prepend node to parent
        if (index === 0) {
            parent['prepend'](params.node);
        }

        //if index is higher then parent has children just append node to parent
        else if (index+1 >= params.parentContents.length) {
            parent['append'](params.node);
        }
        else {
            let contents = parent.childNodes,
                currentIndex = Array.prototype.indexOf.call(contents, params.node);

            //if node doesn't exist in the parent contents always insert
            //it before the index otherwise do it depending on the index difference
            before = currentIndex == -1 ? true : currentIndex > index;

            //loop trough the parent contents and when index matches
            //prepend or append node to the node current at that index
            for (let i = contents.length - 1; i >= 0; i--) {
                if (i === index) {
                    if (before) {
                        return contents[i]['before'](params.node);
                    } else {
                        return contents[i]['after'](params.node);
                    }
                }
            }
        }

        //$rootScope.repositionBox('select');
    };
}
