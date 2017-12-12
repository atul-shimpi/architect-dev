import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Templates} from "../../../../templates/templates.service";
import {Template} from "../../../../../types/models/Template";
import {Settings} from "vebto-client/core/services/settings.service";
import {ActiveProject} from "../../../projects/active-project";
import {Modal} from "vebto-client/core/ui/modal.service";
import {ConfirmModalComponent} from "vebto-client/core/ui/confirm-modal/confirm-modal.component";
import {BuilderTemplate} from "../../../builder-types";

@Component({
    selector: 'templates-panel',
    templateUrl: './templates-panel.component.html',
    styleUrls: ['./templates-panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TemplatesPanelComponent implements OnInit {

    public templates: Template[] = [];

    /**
     * TemplatesPanelComponent Constructor.
     */
    constructor(
        private templatesApi: Templates,
        private settings: Settings,
        private activeProject: ActiveProject,
        private modal: Modal,
    ) {}

    ngOnInit() {
        this.templatesApi.all().subscribe(response => {
            this.templates = response.templates;
        });
    }

    /**
     * Apply specified template to the active project.
     */
    public applyTemplate(template: BuilderTemplate) {
        console.log('x');
        this.modal.open(ConfirmModalComponent, {
            title: 'Are you sure you want to apply this template?',
            body: 'This will erase all the current contents of your project.',
            bodyBold: 'This action is NOT undoable.',
            ok: 'Apply'
        }).afterClosed().subscribe(result => {
            if ( ! result) return;
            this.activeProject.applyTemplate(template);
        });
    }

    /**
     * Get absolute url for specified template's thumbnail.
     */
    public getThumbnailUrl(template: BuilderTemplate) {
        return this.settings.getBaseUrl(true) + 'storage/' + template.thumbnail;
    }
}
