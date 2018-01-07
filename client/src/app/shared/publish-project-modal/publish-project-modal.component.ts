import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSlideToggleChange} from "@angular/material";
import {NewProjectModalComponent} from "../../dashboard/new-project-page/new-project-modal/new-project-modal.component";
import {Projects} from "../../html-builder/projects/projects.service";
import {ProjectUrl} from "../../html-builder/projects/project-url.service";
import {Project} from "../../../types/models/Project";
import {Settings, Toast} from "../../../../node_modules/vebto-client/core";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'publish-project-modal',
    templateUrl: './publish-project-modal.component.html',
    styleUrls: ['./publish-project-modal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PublishProjectModalComponent implements OnInit {

    /**
     * Backend errors for last request.
     */
    public errors: FtpDetailsErrors = {};

    /**
     * Details of ftp project should be published to.
     */
    public ftpDetails: FtpDetails = {port: 21, ssl: false};

    /**
     * Whether backend request is currently in progress.
     */
    public loading = false;

    /**
     * Subscription for project state toggle
     * http request, if one is in progress.
     */
    private stateToggleRequest: Subscription;

    /**
     * NewProjectModalComponent Constructor.
     */
    constructor(
        private dialogRef: MatDialogRef<NewProjectModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {project: Project},
        private projects: Projects,
        private projectUrl: ProjectUrl,
        private settings: Settings,
        private toast: Toast,
    ) {}

    ngOnInit() {
    }

    public confirm() {
        this.loading = true;

        this.projects.publish(this.data.project.id, this.ftpDetails).subscribe(() => {
            this.loading = false;
            this.toast.open('Project published');
            this.close();
        }, response => {
            this.errors = response.messages;
            this.loading = false;
        });
    }

    /**
     * Close the modal.
     */
    public close() {
        this.dialogRef.close(this.data.project);
    }

    /**
     * Get absolute url for project site.
     */
    public getProjectUrl() {
        return this.projectUrl.getSiteUrl(this.data.project);
    }

    /**
     * Toggle project "published" state.
     */
    public toggleProjectState(e: MatSlideToggleChange) {
        if (this.stateToggleRequest) {
            this.stateToggleRequest.unsubscribe();
            this.stateToggleRequest = null;
        }

        this.stateToggleRequest = this.projects
            .update(this.data.project.id, {published: e.checked ? 1 : 0}).subscribe(response => {
                this.data.project.published = response.project.model.published;
            });
    }
}

export interface FtpDetailsErrors extends FtpDetails {
    general?: string;
}

export interface FtpDetails {
    host?: string,
    username?: string,
    password?: string,
    directory?: string,
    port?: number,
    ssl?: boolean,
}
