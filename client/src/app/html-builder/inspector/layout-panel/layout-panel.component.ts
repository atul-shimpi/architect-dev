import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LivePreview} from "../../live-preview.service";
import {LayoutPanel} from "./layout-panel.service";
import {Container} from "./layout-panel-types";
import {Inspector} from "../inspector.service";
import {SelectedElement} from "../../live-preview/selected-element.service";
import {ContextBoxes} from "../../live-preview/context-boxes.service";

@Component({
    selector: 'layout-panel',
    templateUrl: './layout-panel.component.html',
    styleUrls: ['./layout-panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LayoutPanelComponent implements OnInit {

    private types = ['nodeAdded', 'nodeRemoved', 'nodeChildrenModified', 'domReloaded'];

    /**
     * LayoutPanelComponent Constructor.
     */
    constructor(
        private livePreview: LivePreview,
        private selectedElement: SelectedElement,
        private contextBoxes: ContextBoxes,
        public layoutPanel: LayoutPanel,
        private inspector: Inspector
    ) {}

    ngOnInit() {
        this.livePreview.contentChanged.subscribe(e => {
            if (this.types.indexOf(e.type) === -1) return;
            this.layoutPanel.loadContainers();
        });
    }

    public openInspectorPanel(node: HTMLElement) {
        this.selectedElement.selectNode(node);
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
        this.contextBoxes.repositionBox('hover', node);
    }

    public hideHoverBox() {
        this.contextBoxes.hideBox('hover');
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
        return this.selectedElement.node === node;
    }

    /**
     * Get width percentage from specified column span.
     */
    public widthFromSpan(span: number): string {
        return ((span * 100) / 12) + '%';
    }
}
