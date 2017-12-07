import {Injectable} from '@angular/core';
import {Settings} from "vebto-client/core/services/settings.service";
import {CurrentUser} from "vebto-client/auth/current-user";

@Injectable()
export class ProjectBaseUrl {

    /**
     * ProjectBaseUrlService Constructor.
     */
    constructor(private settings: Settings, private currentUser: CurrentUser) {}

    public generate(uuid: string): string {
        return this.settings.getBaseUrl(true)+'storage/projects/'+this.currentUser.get('id')+'/'+uuid+'/';
    }
}
