import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Project} from "../../types/models/Project";
import {Settings} from "vebto-client/core/services/settings.service";

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
    constructor(private route: ActivatedRoute, private router: Router, private settings: Settings) {}

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.projects = data.projects;
        });
    }

    public openBuilder(project: Project) {
        this.router.navigate(['/builder', project.id]);
    }

    public getProjectImage(project: Project) {
        return this.settings.getBaseUrl(true) + 'storage/project-thumbnails/' + project.id + '.png';
    }
}
