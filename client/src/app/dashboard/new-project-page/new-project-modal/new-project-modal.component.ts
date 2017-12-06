import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {Projects} from "../../../html-builder/projects/projects.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Templates} from "../../../templates/templates.service";

@Component({
    selector: 'new-project-modal',
    templateUrl: './new-project-modal.component.html',
    styleUrls: ['./new-project-modal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NewProjectModalComponent {

    /**
     * New project model.
     */
    private newProject: {name?: string} = {};

    /**
     * Errors from backend.
     */
    private errors: {name?: string} = {};

    /**
     * NewProjectModalComponent Constructor.
     */
    constructor(
        private dialogRef: MatDialogRef<NewProjectModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {templateId?: number},
        private projects: Projects,
        private templates: Templates,
    ) {}

    /**
     * Create a new project.
     */
    public confirm() {
        const params = {name: this.newProject.name, templateId: this.data.templateId};

        if (this.data.templateId) {
            this.templates.get(this.data.templateId).subscribe(response => {
                params['pages'] = response.template.pages;
                params['template'] = {css: response.template.pages[0].css, js: response.template.pages[0].js};

                this.projects.create(params).subscribe(response => {
                    this.dialogRef.close(response.project);
                }, response => this.errors = response.messages);
            });
        }


    }
}
