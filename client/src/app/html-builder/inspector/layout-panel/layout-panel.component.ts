import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LivePreview} from "../../live-preview.service";

type Columns = {node: HTMLElement, span: number}[];

@Component({
    selector: 'layout-panel',
    templateUrl: './layout-panel.component.html',
    styleUrls: ['./layout-panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LayoutPanelComponent implements OnInit {

    public containers: {node: HTMLElement, rows: HTMLElement[]}[] = [];

    public selectedRow: {node: HTMLElement, columns: Columns};

    constructor(private livePreview: LivePreview) {
    }

    ngOnInit() {
        this.livePreview.contentChanged.debounceTime(500).subscribe(() => {
            this.containers = [];
            this.nodeListToArray(this.livePreview.document.querySelectorAll('.container')).forEach(node => {
                const rows = node.querySelectorAll('.row') as HTMLElement[];
                this.containers.push({node: node as HTMLElement, rows: rows});
            });
        });
    }

    public selectRow(node: HTMLElement) {
        console.log('x');
        if ( ! node) return;

        this.livePreview.selectNode(node, false);

        let cols = this.nodeListToArray(node.children).filter(node => {
            return node.className.indexOf('col-') > -1;
        });

        let columns = this.getSpans(cols);

        this.livePreview.selected.node.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});

        this.selectedRow = {node, columns};
    }

    public selectColumn(node: HTMLElement) {
        this.livePreview.selectNode(node, false);
        this.livePreview.selected.node.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }

    public isSelected(node: HTMLElement) {
        return this.livePreview.selected.node === node;
    }

    /**
     * Get width percentage from specified column span.
     */
    public widthFromSpan(span: number): string {
        return ((span * 100) / 12) + '%';
    }

    /**
     * Return given columns span.
     */
    getSpan(node: HTMLElement) {
        return parseInt(node.className.match(/col-[a-z]+-([0-9]+)/)[1]);
    }

    /**
     * Get column span numbers for currently active row.
     */
    getSpans(columns: HTMLElement[]): Columns {
        return columns.map(column => {
            return {node: column, span: this.getSpan(column)};
        });
    }

    private nodeListToArray(nodeList: NodeListOf<Element>|HTMLCollection|any[]) {
        let array = [];

        for (let i = 0; i < nodeList.length; i++) {
            array.push(nodeList[i]);
        }

        return array;
    }

    //
    // /**
    //  * Get total columns span for a row.
    //  *
    //  * @type {object} row
    //  * @return integer
    //  */
    // getTotalSpan(row) {
    //     var total = 0;
    //
    //     for (var i = 0; i < this.getColumns(row).length; i++) {
    //         total += this.getSpan($(this.getColumns(row)[i]));
    //     }
    //
    //     return total;
    // },
    //
    // /**
    //  * Reuturn number of columns given row has.
    //  *
    //  * @param  DOM row
    //  * @return integer
    //  */
    // getNumberOfCols(row) {
    //     return this.getColumns(row).length;
    // },

}
