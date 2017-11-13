import {Component, ViewEncapsulation} from '@angular/core';
import {LivePreview} from "../../live-preview.service";

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
    constructor(public livePreview: LivePreview) {}

    /**
     * Check if specified property/style of this element can be modified.
     */
    public canModify(property: string) {
        return this.livePreview.selected.canModify(property);
    }

}
