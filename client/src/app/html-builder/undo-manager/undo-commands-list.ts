import commandParams from "./undo-manager-types";

type commandInterface = {undo: Function, redo: Function};

export class UndoCommandsList {

    public static generic(params: commandParams) {
        return {
            undo: params.undo,
            redo: params.redo,
        }
    }

    public static domChanges(params: commandParams) {
        return {
            undo: () => {
                //params.node.parentNode.replaceChild(params.oldNode, params.node);

                while (params.node.hasChildNodes()) params.node.removeChild(params.node.firstChild);

                const cloned = params.oldNode.cloneNode(true);
                while (cloned.hasChildNodes()) params.node.appendChild(cloned.firstChild);

                //params.node = params.oldNode;
            },
            redo: () => {
                //params.node.parentNode.replaceChild(params.newNode, params.node);

                while (params.node.hasChildNodes()) params.node.removeChild(params.node.firstChild);

                const cloned = params.newNode.cloneNode(true);
                while (cloned.hasChildNodes()) params.node.appendChild(cloned.firstChild);



                //params.node = params.newNode;
            },
        }
    }

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

}
