import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {Toast} from "../../../../../node_modules/vebto-client/core/ui/toast.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {CrupdateUserModalComponent} from "../../../../../node_modules/vebto-client/admin/users/crupdate-user-modal/crupdate-user-modal.component";
import {Templates} from "../../../templates/templates.service";
import {BuilderTemplate} from "../../../html-builder/builder-types";

@Component({
    selector: 'crupdate-template-modal',
    templateUrl: './crupdate-template-modal.component.html',
    styleUrls: ['./crupdate-template-modal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CrupdateTemplateModalComponent implements OnInit {

    /**
     * Template model.
     */
    public model: BuilderTemplate;

    /**
     * If we are updating existing template or creating a new one.
     */
    public updating: boolean = false;

    /**
     * Errors returned from backend.
     */
    public errors: any = {};

    /**
     * CrupdateUserModalComponent Constructor.
     */
    constructor(
        private dialogRef: MatDialogRef<CrupdateUserModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {template?: BuilderTemplate},
        public templates: Templates,
        private toast: Toast
    ) {
        this.resetState();
    }

    ngOnInit() {
        this.resetState();

        if (this.data.template) {
            this.updating = true;
            this.hydrateModel(this.data.template);
        } else {
            this.updating = false;
        }
    }

    /**
     * Create a new template or update existing one.
     */
    public confirm() {
        let request, payload = this.getPayload();

        if (this.updating) {
            request = this.templates.update(payload.id, payload);
        } else {
            request = this.templates.create(payload);
        }

        request.subscribe(response => {
            this.close(response.data);
            let action = this.updating ? 'updated' : 'created';
            this.toast.open('Template has been '+action);
        }, response => {
            this.errors = response.messages;
        });
    }

    /**
     * Get payload for updating or creating a template.
     */
    private getPayload() {
        return Object.assign({}, this.model) as any;
    }

    /**
     * Close the modal.
     */
    public close(data?: any) {
        this.resetState();
        this.dialogRef.close(data);
    }

    /**
     * Populate template model with given data.
     */
    private hydrateModel(template: BuilderTemplate) {
        Object.assign(this.model, template);
    }

    /**
     * Reset all modal state to default.
     */
    private resetState() {
        this.model = new BuilderTemplate();
        this.errors = {};
    }
}
