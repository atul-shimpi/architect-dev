import {Injectable} from '@angular/core';
import {Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router} from '@angular/router';
import {Template} from "../../../types/models/Template";
import {Templates} from "../../templates/templates.service";

@Injectable()
export class TemplatesResolver implements Resolve<Template[]> {

    constructor(
        private router: Router,
        private templates: Templates,
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Template[]> {
        return this.templates.all().toPromise().then(response => {
            return response.templates;
        }).catch(() => {
            this.router.navigate(['/dashboard']);
            return false;
        }) as Promise<Template[]>;
    }
}