import {Injectable} from '@angular/core';
import {Columns, Container} from "./layout-panel-types";
import {LivePreview} from "../../live-preview.service";
import {utils} from "vebto-client/core";
import {UndoManager} from "../../undo-manager/undo-manager.service";

@Injectable()
export class LayoutPanel {

    /**
     * All existing containers in the live preview.
     */
    public containers: Container[] = [];

    /**
     * Currently selected row.
     */
    public selectedRow: {node: HTMLElement, columns: Columns, preset: number[]};

    public selectedContainer: Container;

    /**
     * LayoutPanel Service Constructor.
     */
    constructor(private livePreview: LivePreview, private undoManager: UndoManager) {}

    /**
     * Select all containers in live preview.
     */
    public selectContainers() {
        this.containers = [];
        this.nodeListToArray(this.livePreview.document.querySelectorAll('.container')).forEach(node => {
            const rows = this.nodeListToArray(node.querySelectorAll('.row'));
            this.containers.push({node: node as HTMLElement, rows: rows});
        });
    }

    /**
     * Add a row before or after specified reference element.
     */
    public createRow(container: HTMLElement, ref: HTMLElement, dir: 'before'|'after'|'start') {
        const row = this.livePreview.document.createElement('div');
        row.classList.add('row');

        if (dir === 'start') {
            if (ref) {
                ref.parentNode.insertBefore(row, ref);
            } else {
                container.appendChild(row);
            }
        } else {
            ref[dir](row);
        }

        this.selectRow(row);
        this.livePreview.contentChanged.emit();
    }

    /**
     * Create new container node and add it to the container's list.
     */
    public createContainer(ref: HTMLElement, dir: 'before'|'after'|'start') {
        const container = this.livePreview.document.createElement('div');
        container.classList.add('container');

        if (dir === 'start') {
            this.livePreview.document.body.appendChild(container);
        } else {
            ref[dir](container);
        }

        this.selectedContainer = {node: container, rows: []};
        this.livePreview.selectNode(this.selectedContainer.node, false);
        this.livePreview.contentChanged.emit();
    }

    /**
     * Select specified row.
     */
    public selectRow(node: HTMLElement) {
        if ( ! node) return;

        this.livePreview.selectNode(node, false);

        const columns = this.getColumns(node),
            preset  = columns.map(col => col.span);

        this.livePreview.selected.node.scrollIntoView({block: "end", inline: "nearest"});

        this.selectedRow = {node, columns, preset};
    }

    private getColumns(node: HTMLElement): Columns {
        let cols = this.nodeListToArray(node.children).filter(node => {
            return node.className.indexOf('col-') > -1;
        });

        return cols.map(column => {
            return {node: column, span: this.getSpan(column), id: utils.randomString()};
        });
    }

    public selectColumn(node: HTMLElement) {
        this.livePreview.selectNode(node, false);
        this.livePreview.selected.node.scrollIntoView({block: "end", inline: "nearest"});
    }

    public applyPreset(preset: number[]) {
        const oldNode = this.selectedRow.node.cloneNode(true) as HTMLElement;

        //remove extra columns
        if (this.selectedRow.columns.length > preset.length) {
            let cols = this.selectedRow.columns.slice(preset.length);
            cols.forEach(col => col.node.remove());
        }

        preset.forEach((span, i) => {
            //resize existing columns
            if (this.selectedRow.columns[i]) {
                this.resizeColumn(this.selectedRow.columns[i].node, span);
            }

            //add new columns, if needed
            else {
                this.addNewColumn(this.selectedRow.columns[i-1].node, span);
            }

        });

        this.undoManager.add('domChanges', {
            oldNode: oldNode,
            newNode: this.selectedRow.node.cloneNode(true) as HTMLElement,
            node: this.selectedRow.node,
        });

        this.selectRow(this.selectedRow.node);
        //this.livePreview.contentChanged.emit();
        this.livePreview.repositionBox('selected');
    }

    /**
     * Insert new column before or after the given one.
     */
    public addNewColumn(node: HTMLElement, span: number, dir: 'before'|'after' = 'after') {
        let nodeIndex = this.getNodeIndex(this.selectedRow.columns, node),
            siblings  = this.nodeListToArray(node.parentNode.childNodes),
            colsAfter = siblings.filter(siblingIndex => nodeIndex < siblingIndex),
            colsBefore = siblings.filter(siblingIndex => nodeIndex > siblingIndex),
            inserted = false;

        //add new column without resizing other columns if there's enough space left
        if ((this.getTotalSpan(this.selectedRow.columns) + span) <= 12) {
            node[dir](this.createColumnNode(span));
            inserted = true;
        }

        //try to reduce the next column by one
        if ( ! inserted && this.widerThen(1, colsAfter[0])) {
            this.resizeColumn(colsAfter[0], 1, '-');
            node[dir](this.createColumnNode(span));
            inserted = true;
        }

        //try to reduce the specified column by one
        else if ( ! inserted && this.widerThen(1, node)) {
            this.resizeColumn(node, 1, '-');
            node['after'](this.createColumnNode(span));
            inserted = true;
        }

        //loop trough all columns after given one and
        //reduce the first one that's wider then one
        if ( ! inserted) {
            for (let i = 0; i < colsAfter.length; i++) {
                if (this.widerThen(1, colsAfter[i])) {
                    this.resizeColumn(colsAfter[i], 1, '-');
                    node[dir](this.createColumnNode(span));
                    inserted = true;
                    break;
                }
            }
        }

        //loop trough all columns before given one and
        //reduce the first one that's wider then one
        if ( ! inserted) {
            for (let i = 0; i < colsBefore.length; i++) {
                if (this.widerThen(1, colsBefore[i])) {
                    this.resizeColumn(colsBefore[i], 1, '-');
                    node[dir](this.createColumnNode(span));
                    inserted = true;
                    break;
                }
            }
        }

        this.selectedRow.columns = this.getColumns(this.selectedRow.node);
    }

    /**
     * Get total span for specified row.
     */
    private getTotalSpan(columns: Columns): number {
        const spans = columns.map(col => this.getSpan(col.node));

        return spans.reduce((total, span) => {
            return total + span
        });
    }

    /**
     * Create new column node of specified span.
     */
    private createColumnNode(span: number): HTMLElement {
        let col = this.livePreview.document.createElement('div');
        col.innerText = 'New Column';
        col.className = 'col-sm-'+span;
        return col;
    }

    /**
     * Return whether given column is wider then
     * given number of spans or not.
     */
    private widerThen(span: number, node: HTMLElement) {
        if (this.isColumn(node)) {
            return this.getSpan(node) > span;
        }
    }

    /**
     * Check whether or not specified node is a column.
     */
    private isColumn(node: HTMLElement) {
        if (node && node.className) {
            return node.className.indexOf('col-') > -1;
        }
    }

    private getNodeIndex(nodeList: NodeList|Columns, node: Node) {
        for (let i = nodeList.length - 1; i >= 0; i--) {
            if (nodeList[i] === node) return i;
        }
    }

    /**
     * Resize passed in column in the DOM.
     */
    private resizeColumn(node: HTMLElement, newSpan: number, operator?: '+'|'-') {
        if ( ! newSpan) newSpan = 1;

        node.className = node.className.replace(/(col-[a-z]+-)([0-9]+)/, function(full, start, oldSpan) {
            if (operator) {
                return operator === '+' ? start+(parseInt(oldSpan)+newSpan) : start+(parseInt(oldSpan)-newSpan);
            }

            return start+newSpan;
        });
    }

    /**
     * Return given columns span.
     */
    private getSpan(node: HTMLElement): number {
        return parseInt(node.className.match(/col-[a-z]+-([0-9]+)/)[1]);
    }

    private nodeListToArray(nodeList: NodeListOf<Element>|HTMLCollection|any[]|NodeList) {
        let array = [];

        for (let i = 0; i < nodeList.length; i++) {
            array.push(nodeList[i]);
        }

        return array;
    }

}
