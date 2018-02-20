import {Injectable} from '@angular/core';
import {Settings} from "vebto-client/core/services/settings.service";
import {CurrentUser} from "vebto-client/auth/current-user";
import {Project} from './Project';

@Injectable()
export class ProjectUrl {

    /**
     * ProjectBaseUrlService Constructor.
     */
    constructor(private settings: Settings, private currentUser: CurrentUser) {}

    /**
     * Get specified project's base url for the builder.
     */
    public getBaseUrl(uuid: string, relative: boolean = false): string {
        const uri = 'projects/'+this.currentUser.get('id')+'/'+uuid+'/';

        if (relative) return uri;

        return this.settings.getBaseUrl()+'storage/' + uri;
    }

    /**
     * Get production site url for specified project.
     */
    public getSiteUrl(project: Project): string {
        let base = this.settings.getBaseUrl(true);
        const protocol = base.match(/(^\w+:|^)\/\//)[0];

        if (this.settings.get('builder.routing_type') === 'subdomain') {
            //strip protocol from the url
            return protocol+project.name+'.'+base.replace(protocol, '');
        }

        return this.settings.getBaseUrl(true)+'sites/'+project.name;
    }
}
