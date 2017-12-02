import {Injectable} from '@angular/core';
import {Columns, Container} from "./layout-panel-types";
import {utils} from "vebto-client/core";
import {UndoManager} from "../../undo-manager/undo-manager.service";
import {SelectedElement} from "../../live-preview/selected-element.service";
import {BuilderDocument} from "../../builder-document.service";
import {LivePreviewDocument} from "../../live-preview/live-preview-document.service";
import {ContextBoxes} from "../../live-preview/context-boxes.service";

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
    constructor(
        private previewDocument: LivePreviewDocument,
        private builderDocument: BuilderDocument,
        private selected: SelectedElement,
        private undoManager: UndoManager,
        private contextBoxes: ContextBoxes,
    ) {
        this.selected.changed.subscribe(() => {
            this.selectRowAndContainerUsing(this.selected.node)
        });
    }

    /**
     * Load all containers from live preview.
     */
    public loadContainers() {
        this.containers = [];
        this.nodeListToArray(this.previewDocument.findAll('.container')).forEach(node => {
            const rows = this.nodeListToArray(node.querySelectorAll('.row'));
            this.containers.push({node: node as HTMLElement, rows: rows, id: utils.randomString()});
            if (this.selectedContainer) this.selectContainer(this.selectedContainer.node);
        });
    }

    /**
     * Add a row before or after specified reference element.
     */
    public createRow(container: HTMLElement, ref: HTMLElement, dir: 'before'|'after'|'start') {
        const row = this.previewDocument.createElement('div');
        row.appendChild(this.createColumnNode(12));
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
        this.builderDocument.setHtml(this.previewDocument.getOuterHtml(), 'livePreview');
    }

    /**
     * Create new container node and add it to the container's list.
     */
    public createContainer(ref: HTMLElement, dir: 'before'|'after'|'start') {
        const row = this.previewDocument.createElement('div');
        row.appendChild(this.createColumnNode(12));
        row.classList.add('row');

        const container = this.previewDocument.createElement('div');
        container.classList.add('container');
        container.appendChild(row);

        if (dir === 'start') {
            this.previewDocument.getBody().appendChild(container);
        } else {
            ref[dir](container);
        }

        this.builderDocument.setHtml(this.previewDocument.getOuterHtml(), 'livePreview');
        this.selectContainer(container);
        this.selected.selectNode(this.selectedContainer.node);
    }

    public selectContainer(container: Container|HTMLElement, selectRow = true) {
        if (container['nodeType']) {
            this.selectedContainer = this.containers.find(cont => cont.node === container);
        } else {
            this.selectedContainer = container as Container;
        }

        if (this.selectedContainer && selectRow) {
            this.selectRow(this.selectedContainer.rows[0]);
        }
    }

    public rowIsSelected(node: HTMLElement) {
        return this.selectedRow && this.selectedRow.node === node;
    }

    public containerIsSelected(node: HTMLElement) {
        return this.selectedContainer && this.selectedContainer.node === node;
    }

    /**
     * Select specified row.
     */
    public selectRow(node: HTMLElement, selectNode = true) {
        if ( ! node) return;

        if (selectNode) this.selected.selectNode(node);

        const columns = this.getColumns(node),
            preset  = columns.map(col => col.span);

        this.previewDocument.scrollIntoView(node);

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
        this.selected.selectNode(node);
        this.previewDocument.scrollIntoView(node);
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

            //add new columns, if row already has some columns
            else if (this.selectedRow.columns[i-1]) {
                this.addNewColumn(this.selectedRow.columns[i-1].node, span);

            //row is empty
            } else {
                this.selectedRow.node.appendChild(this.createColumnNode(span));
            }
        });

        this.undoManager.add('domChanges', {
            oldNode: oldNode,
            newNode: this.selectedRow.node.cloneNode(true) as HTMLElement,
            node: this.selectedRow.node,
        });

        this.selectRow(this.selectedRow.node);
        this.builderDocument.setHtml(this.previewDocument.getOuterHtml(), 'livePreview');
        this.contextBoxes.repositionBox('selected', this.selected.node);
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
        let col = this.previewDocument.createElement('div');
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

    /**
     * Select row and container using specified node (column, row or container).
     */
    public selectRowAndContainerUsing(node: HTMLElement) {
        let row, container;

        if ( ! node || ! this.selected.isLayout()) return;

        if (this.selected.isRow()) {
            row = node;
            container = row.closest('.container') as HTMLElement;
        }

        if (this.selected.isColumn()) {
            row = node.closest('.row') as HTMLElement;
            container = row.closest('.container') as HTMLElement;
        }

        if (this.selected.isContainer()) {
            container = node;
            row = container.querySelector('.row');
        }

        if ( ! this.rowIsSelected(row)) {
            this.selectRow(row, false);
        }

        if ( ! this.containerIsSelected(container)) {
            this.selectContainer(container, false);
        }
    }
}