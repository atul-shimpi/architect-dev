import {Component, ViewEncapsulation} from '@angular/core';
import {OverlayRef} from "@angular/cdk/overlay";
import {ActiveProject} from "../../projects/active-project";

@Component({
    selector: 'link-editor',
    templateUrl: './link-editor.component.html',
    styleUrls: ['./link-editor.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LinkEditorComponent {

    /**
     * Reference to this editor's overlay.
     */
    private overlayRef: OverlayRef;

    /**
     * Model for link src inputs.
     */
    public hrefModel: string;

    /**
     * Name of the download for download link.
     */
    public downloadName: string;

    /**
     * Node whose link is being edited.
     */
    private node: HTMLLinkElement;

    /**
     * LinkEditorComponent Constructor.
     */
    constructor(public activeProject: ActiveProject) {}

    public setEmail() {
        this.node.href = 'mailto:' + this.hrefModel;
        this.close();
    }

    public setDownload() {
        this.node.href = this.hrefModel;
        this.node.setAttribute('download', this.downloadName);
        this.close();
    }

    public setPageLink() {
        this.node.href = this.hrefModel + '.html';
        this.close();
    }

    public setUrl() {
        this.node.href = this.hrefModel;
        this.close();
    }

    public close() {
        this.overlayRef.dispose();
    }

    public setParams(node: HTMLLinkElement, overlayRef: OverlayRef) {
        this.node = node;
        this.overlayRef = overlayRef;
    }

    public resetModel() {
        this.hrefModel = null;
    }
}
