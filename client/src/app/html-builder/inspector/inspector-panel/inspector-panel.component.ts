import {Component, ViewEncapsulation} from '@angular/core';
import {LivePreview} from "../../live-preview.service";
import {LayoutPanel} from "../layout-panel/layout-panel.service";
import {Inspector} from "../inspector.service";
import {UploadFileModalComponent} from "vebto-client/core/index";
import {Modal} from "vebto-client/core/ui/modal.service";
import {ProjectBaseUrl} from "../../projects/project-base-url.service";
import {ActiveProject} from "../../projects/active-project";

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
        private inspector: Inspector,
        private modal: Modal,
        private activeProject: ActiveProject,
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

    public openUploadImageModal() {
        const data = {uri: 'uploads/images', httpParams: {path: this.activeProject.getBaseUrl(true)+'images'}};
        this.modal.open(UploadFileModalComponent, data).afterClosed().subscribe(url => {
            this.livePreview.selected.node['src'] = url;
        });
    }

    /**
     * Check if currently selected node is column, row or container.
     */
    public selectedIsLayout() {
        return this.livePreview.selected.isLayout();
    }

    /**
     * Check if currently selected node is an image.
     */
    public selectedIsImage() {
        return this.livePreview.selected.isImage;
    }
}
