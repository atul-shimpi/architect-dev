import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Project} from "../../types/models/Project";
import {Settings} from "vebto-client/core/services/settings.service";
import {CurrentUser} from "vebto-client/auth/current-user";
import {Projects} from "../html-builder/projects/projects.service";
import {Toast} from "vebto-client/core/ui/toast.service";
import {Modal} from "vebto-client/core/ui/modal.service";
import {ConfirmModalComponent} from "vebto-client/core/ui/confirm-modal/confirm-modal.component";
import {ProjectBaseUrl} from "../html-builder/projects/project-base-url.service";
import {VebtoConfig} from "../../../node_modules/vebto-client/core/vebto-config.service";

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

    public projects: Project[] = [];

    public models = {
        query: '',
        order: 'newest',
        status: 'all',
    };

    /**
     * DashboardComponent Constructor.
     */
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private settings: Settings,
        private currentUser: CurrentUser,
        private projectsApi: Projects,
        private toast: Toast,
        private modal: Modal,
        private projectUrl: ProjectBaseUrl,
        public siteConfig: VebtoConfig,
    ) {}

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.projects = data.projects.data;
        });
    }

    /**
     * Open specified project in the builder.
     */
    public openBuilder(project: Project) {
        this.router.navigate(['/builder', project.id]);
    }

    /**
     * Get absolute url for specified project's thumbnail image.
     */
    public getProjectImage(project: Project) {
        return this.projectUrl.generate(project.uuid)+'thumbnail.png';
    }

    /**
     * Get absolute url for specified project site.
     */
    public getProjectUrl(project: Project) {
        return this.settings.getBaseUrl(true)+'sites/'+project.name;
    }

    /**
     * Delete specified project, if user confirms it.
     */
    public deleteProjectWithConfirmation(project: Project) {
        this.modal.open(ConfirmModalComponent, {
            title: 'Delete Project',
            body: 'Are you sure you want to delete this project?',
            ok: 'Delete',
        }).afterClosed().subscribe(confirmed => {
            if ( ! confirmed) return;

            this.projectsApi.delete({ids: [project.id]}).subscribe(() => {
                this.toast.open('Project deleted');
                this.projects.splice(this.projects.indexOf(project), 1);
            });
        });
    }
}
