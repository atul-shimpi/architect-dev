import {AfterViewInit, Component, ViewEncapsulation} from '@angular/core';
import {LivePreview} from "../../live-preview.service";
import {LayoutPanel} from "./layout-panel.service";
import {Container} from "./layout-panel-types";

@Component({
    selector: 'layout-panel',
    templateUrl: './layout-panel.component.html',
    styleUrls: ['./layout-panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LayoutPanelComponent implements AfterViewInit {

    /**
     * LayoutPanelComponent Constructor.
     */
    constructor(private livePreview: LivePreview, public layoutPanel: LayoutPanel) {}

    ngAfterViewInit() {
        this.livePreview.contentChanged.debounceTime(500).subscribe(() => {
            this.layoutPanel.selectContainers();
        });
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
