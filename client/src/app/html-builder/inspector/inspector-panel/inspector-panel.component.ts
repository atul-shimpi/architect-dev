import {Component, ViewEncapsulation} from '@angular/core';
import {LivePreview} from "../../live-preview.service";
import {LayoutPanel} from "../layout-panel/layout-panel.service";
import {Inspector} from "../inspector.service";

@Component({
    selector: 'inspector-panel',
    templateUrl: './inspector-panel.component.html',
    styleUrls: ['./inspector-panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class InspectorPanelComponent {

    /**
     * InspectorPanelComponent Constructor.
     */
    constructor(
        public livePreview: LivePreview,
        private layout: LayoutPanel,
        private inspector: Inspector
    ) {}

    /**
     * Check if specified property/style of this element can be modified.
     */
    public canModify(property: string) {
        return this.livePreview.selected.canModify(property);
    }

    /**
     * Open layout panel for currently selected element.
     */
    public openLayoutPanel() {
        this.layout.selectRowAndContainerUsing(this.livePreview.selected.node);
        this.inspector.openPanel('layout');
    }

    /**
     * Check if currently selected node is column, row or container.
     */
    public selectedIsLayout() {
        return this.livePreview.selected.isLayout();
    }
}
