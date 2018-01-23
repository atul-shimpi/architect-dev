import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Settings} from "vebto-client/core/services/settings.service";
import {TemplateColors} from "./template-colors";
import {Modal} from "vebto-client/core/ui/modal.service";
import {NewProjectModalComponent} from "./new-project-modal/new-project-modal.component";
import {BuilderProject, BuilderTemplate} from "../../html-builder/builder-types";
import {VebtoConfig} from "vebto-client/core/vebto-config.service";

@Component({
    selector: 'new-project-page',
    templateUrl: './new-project-page.component.html',
    styleUrls: ['./new-project-page.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NewProjectPageComponent implements OnInit {

    public colors = TemplateColors;

    /**
     * All available templates.
     */
    public templates: BuilderTemplate[] = [];

    /**
     * Template filtered by category and color.
     */
    public filteredTemplates: BuilderTemplate[] = [];

    /**
     * Currently selected category filter.
     */
    public selectedCategory: string | null;

    /**
     * Currently selected color filter.
     */
    public selectedColor: string | null;

    /**
     * NewProjectPageComponent Constructor.
     */
    constructor(
        private route: ActivatedRoute,
        private settings: Settings,
        private modal: Modal,
        private router: Router,
        public siteConfig: VebtoConfig,
    ) {}

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.templates = data.templates;
            this.filteredTemplates = data.templates;
        });
    }

    /**
     * Open new project modal with specified template.
     */
    public openNewProjectModal(templateName?: string) {
        this.modal.open(NewProjectModalComponent, {templateName}).afterClosed().subscribe((project: BuilderProject) => {
            if ( ! project) return;
            this.router.navigate(['/builder', project.model.id]);
        });
    }

    public getTemplateThumbnail(template: BuilderTemplate) {
        return this.settings.getBaseUrl(true) + 'storage/' + template.thumbnail;
    }

    /**
     * Filter available templates by specified category.
     */
    public filterByCategory(name: string|null) {
        this.selectedCategory = name;

        if ( ! name) return this.filteredTemplates = this.templates.slice();

        this.filteredTemplates = this.templates.filter(template => {
            return template.config.category.toLowerCase().indexOf(name.toLowerCase()) > -1;
        });
    }

    /**
     * Filter available templates by specified color.
     */
    public filterByColor(name: string|null) {
        this.selectedColor = name;

        if ( ! name) return this.filteredTemplates = this.templates.slice();

        this.filteredTemplates = this.templates.filter(template => {
            return template.config.color.toLowerCase().indexOf(name.toLowerCase()) > -1;
        });
    }
}
