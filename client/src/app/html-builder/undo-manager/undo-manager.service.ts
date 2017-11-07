import {Injectable} from '@angular/core';
import {UndoCommand} from "./undo-command";
import commandParams from "./undo-manager-types";

@Injectable()
export class UndoManager {

    constructor() {
    }

    /**
     * Stack of undo/redo commands.
     */
    private commands: UndoCommand[] = [];

    /**
     * Current position of pointer in undo/redo stack.
     */
    private pointer = -1;

    /**
     * Whether or not there's any undos left in the stack.
     */
    public canUndo() {
        return this.pointer !== -1;
    };

    /**
     * Whether or not there's any redos left in the stack.
     *
     * @return {Boolean}
     */
    public canRedo() {
        return this.pointer < (this.commands.length - 1);
    }

    /**
     * Execute undo function of command at current pointers position in stack.
     */
    public undo() {
        const command = this.commands[this.pointer];

        if (command) {
            command.undo();
            this.pointer -= 1;
        }
    }

    /**
     * Execute redo function of command at current pointers position in stack.
     */
    public redo() {
        const command = this.commands[this.pointer + 1];

        if (command) {
            command.redo();
            this.pointer += 1;
        }
    }

    /**
     * Add a new undo/redo command to the stack.
     */
    public add(name: string, params: commandParams) {

        //invalidate commands higher on the stack then this one if any exist
        //this.commands.splice(this.index + 1, this.commands.length - this.index);

        //make a new command
        const command = new UndoCommand(name, params);

        //push it onto the stack
        this.commands.push(command);

        //update pointer position
        this.pointer = this.commands.length - 1;

        return command;
    }
}
