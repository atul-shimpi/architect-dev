import {Injectable} from '@angular/core';
import {Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router} from '@angular/router';
import {ParsedProject} from "./projects/parsed-project";
import {Projects} from "./projects/projects.service";

@Injectable()
export class ProjectResolver implements Resolve<ParsedProject> {

    constructor(
        private activeProject: ParsedProject,
        private router: Router,
        private projects: Projects,
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ParsedProject> {


        return new Promise(resolve => {
            this.projects.get(route.params.id).subscribe(response => {
                this.activeProject.setProject(response.project);
                resolve(this.activeProject);
            }, () => {
                this.router.navigate(['dashboard']);
                resolve(this.activeProject);
            });
        });
    }
}