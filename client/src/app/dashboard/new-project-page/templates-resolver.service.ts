import {Injectable} from '@angular/core';
import {Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router} from '@angular/router';
import {Templates} from "../../templates/templates.service";
import {BuilderTemplate} from "../../html-builder/builder-types";

@Injectable()
export class TemplatesResolver implements Resolve<BuilderTemplate[]> {

    constructor(
        private router: Router,
        private templates: Templates,
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<BuilderTemplate[]> {
        return this.templates.all({per_page: 50}).toPromise().then(response => {
            return response.data;
        }).catch(() => {
            this.router.navigate(['/dashboard']);
            return null;
        });
    }
}