import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Templates} from "../../../../templates/templates.service";
import {Template} from "../../../../../types/models/Template";
import {Settings} from "vebto-client/core/services/settings.service";
import {ActiveProject} from "../../../projects/active-project";
import {Modal} from "vebto-client/core/ui/modal.service";
import {ConfirmModalComponent} from "vebto-client/core/ui/confirm-modal/confirm-modal.component";
import {BuilderTemplate} from "../../../builder-types";
import {Toast} from "vebto-client/core/ui/toast.service";
import {InspectorDrawer} from "../../inspector-drawer.service";
import {LivePreviewLoader} from "../../../live-preview/live-preview-loader.service";

@Component({
    selector: 'templates-panel',
    templateUrl: './templates-panel.component.html',
    styleUrls: ['./templates-panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TemplatesPanelComponent implements OnInit {

    public templates: Template[] = [];

    /**
     * Whether new template is being applied to project currently.
     */
    private loading: boolean = false;

    /**
     * TemplatesPanelComponent Constructor.
     */
    constructor(
        private templatesApi: Templates,
        private settings: Settings,
        private activeProject: ActiveProject,
        private modal: Modal,
        private toast: Toast,
        private inspectorDrawer: InspectorDrawer,
        private loader: LivePreviewLoader,
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
        this.modal.open(ConfirmModalComponent, {
            title: 'Apply Template',
            body: 'Are you sure you want to apply this template?',
            bodyBold: 'This will erase all the current contents of your project.',
            ok: 'Apply'
        }).afterClosed().subscribe(result => {
            if ( ! result) return;

            this.loading = true;
            this.loader.show();

            this.inspectorDrawer.close();

            this.activeProject.applyTemplate(template.name).subscribe(() => {
                this.toast.open('Template applied');
                this.loading = false;
                this.loader.hide();
            });
        });
    }

    /**
     * Get absolute url for specified template's thumbnail.
     */
    public getThumbnailUrl(template: BuilderTemplate) {
        return this.settings.getBaseUrl(true) + 'storage/' + template.thumbnail;
    }
}
