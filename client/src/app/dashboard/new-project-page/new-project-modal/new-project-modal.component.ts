import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {Projects} from "../../../html-builder/projects/projects.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Templates} from "../../../templates/templates.service";
import {PageDocument} from "../../../html-builder/page-document";
import {utils} from "vebto-client/core/services/utils";
import {ProjectBaseUrl} from "../../../html-builder/projects/project-base-url.service";
import {Template} from "../../../../types/models/Template";
import {Page} from "../../../../types/models/Page";

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
    private newProject: {name?: string, uuid: string} = {};

    /**
     * Errors from backend.
     */
    private errors: {name?: string} = {};

    private pageDocument = new PageDocument();

    /**
     * NewProjectModalComponent Constructor.
     */
    constructor(
        private dialogRef: MatDialogRef<NewProjectModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {templateId?: number},
        private projects: Projects,
        private templates: Templates,
        private projectUrl: ProjectBaseUrl,
    ) {
        this.newProject.uuid = utils.randomString(36);
        this.pageDocument.setBaseUrl(this.projectUrl.generate(this.newProject.uuid));
    }

    /**
     * Create a new project.
     */
    public async confirm() {
        let params;

        if (this.data.templateId) {
            params = await this.createProjectFromTemplate();
        } else {
            params = this.createBlankProject();
        }

        this.projects.create(params).subscribe(response => {
            this.dialogRef.close(response.project);
        }, response => this.errors = response.messages);
    }

    /**
     * Get payload for new project created from a template.
     */
    private createProjectFromTemplate(): Promise<any> {
        return new Promise(resolve => {
            const params = this.getBasePayload();

            this.templates.get(this.data.templateId).subscribe(response => {
                params.pages = this.transformTemplatePages(response.template);
                params.template = {
                    id: response.template.id,
                    css: response.template.pages[0].css,
                    js: response.template.pages[0].js
                };

                resolve(params);
            });
        });
    }

    /**
     * Get payload for new project without a template.
     */
    private createBlankProject() {
        const params = this.getBasePayload();

        params.pages.push({
            name: 'index',
            html: this.pageDocument.generate('', '', '').getOuterHtml()
        });

        return params;
    }

    /**
     * Transform template pages into project pages.
     */
    private transformTemplatePages(template: Template) {
        const templateMarkup = {css: template.pages[0].css, js: template.pages[0].js};

        return template.pages.map(page => {
            return {
                name: page.name,
                html: this.pageDocument.generate(page.html, '', '', templateMarkup).getOuterHtml()
            }
        });
    }

    /**
     * Get base payload for creating new project.
     */
    private getBasePayload() {
        return {
            name: this.newProject.name,
            uuid: this.newProject.uuid,
            pages: [],
            template: null,
        };
    }
}
