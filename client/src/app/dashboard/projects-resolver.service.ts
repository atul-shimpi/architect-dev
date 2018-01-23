import {Injectable} from '@angular/core';
import {Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router} from '@angular/router';
import {Project} from "../../types/models/Project";
import {Projects} from "../html-builder/projects/projects.service";
import {CurrentUser} from "vebto-client/auth/current-user";
import {PaginationResponse} from "vebto-client/core/types/pagination-response";

@Injectable()
export class ProjectsResolver implements Resolve<PaginationResponse<Project>> {

    constructor(
        private router: Router,
        private projects: Projects,
        private currentUser: CurrentUser,
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<PaginationResponse<Project>> {
        return this.projects.all({user_id: this.currentUser.get('id'), per_page: 20}).toPromise();
    }
}