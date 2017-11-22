import {AfterViewInit, Component, ViewEncapsulation} from '@angular/core';
import {LivePreview} from "../../live-preview.service";
import {LayoutPanel} from "./layout-panel.service";
import {Container} from "./layout-panel-types";
import {Inspector} from "../inspector.service";

@Component({
    selector: 'layout-panel',
    templateUrl: './layout-panel.component.html',
    styleUrls: ['./layout-panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LayoutPanelComponent implements AfterViewInit {

    private types = ['nodeAdded', 'nodeRemoved', 'nodeChildrenModified', 'contentReloaded'];

    /**
     * LayoutPanelComponent Constructor.
     */
    constructor(
        private livePreview: LivePreview,
        public layoutPanel: LayoutPanel,
        private inspector: Inspector
    ) {}

    ngAfterViewInit() {
        this.livePreview.contentChanged.subscribe(e => {
            if (this.types.indexOf(e.type) === -1) return;
            this.layoutPanel.loadContainers();
        });
    }

    public openInspectorPanel(node: HTMLElement) {
        this.livePreview.selectNode(node, false);
        this.inspector.togglePanel('inspector');
    }

    public cloneContainer(container: Container) {
        const cloned = this.livePreview.cloneNode(container.node);
        this.layoutPanel.selectContainer(cloned);
    }

    public removeItem(node: HTMLElement) {
        this.livePreview.removeNode(node);
    }

    public repositionHoverBox(node: HTMLElement) {
        this.livePreview.repositionBox('hover', node);
    }

    public hideHoverBox() {
        this.livePreview.hideBox('hover');
    }

    public containerIsSelected(container: Container): boolean {
        if ( ! this.layoutPanel.selectedContainer) return false;
        return this.layoutPanel.selectedContainer.node === container.node;
    }

    /**
     * Called when container panel is opened.
     */
    public onPanelOpen(container: Container) {
        this.layoutPanel.selectedContainer = container;

        if (container.rows.length) {
            this.layoutPanel.selectRow(container.rows[0]);
        }
    }

    /**
     * Check if specified node is selected in live preview.
     */
    public isSelected(node: HTMLElement) {
        return this.livePreview.selected.node === node;
    }

    /**
     * Get width percentage from specified column span.
     */
    public widthFromSpan(span: number): string {
        return ((span * 100) / 12) + '%';
    }
}
