import {Injectable} from '@angular/core';
import {Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router} from '@angular/router';
import {Project} from "../../types/models/Project";
import {Projects} from "../html-builder/projects/projects.service";
import {CurrentUser} from "vebto-client/auth/current-user";

@Injectable()
export class ProjectsResolver implements Resolve<{projects: Project[]}> {

    constructor(
        private router: Router,
        private projects: Projects,
        private currentUser: CurrentUser,
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<{projects: Project[]}> {
        return this.projects.all({user_id: this.currentUser.get('id')}).toPromise();
    }
}