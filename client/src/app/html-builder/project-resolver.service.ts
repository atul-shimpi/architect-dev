import {Injectable} from '@angular/core';
import {Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router} from '@angular/router';
import {Projects} from "./projects/projects.service";
import {BuilderProject} from "./builder-types";

@Injectable()
export class ProjectResolver implements Resolve<BuilderProject> {

    constructor(
        private router: Router,
        private projects: Projects,
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<BuilderProject> {
        return this.projects.get(route.params.id).toPromise().then(response => {
            return response.project;
        }).catch(() => {
            this.router.navigate(['dashboard']);
        }) as Promise<BuilderProject>;
    }
}