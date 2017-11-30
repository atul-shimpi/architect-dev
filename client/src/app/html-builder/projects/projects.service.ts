import {Injectable} from '@angular/core';
import {AppHttpClient} from "vebto-client/core";
import {Observable} from "rxjs/Observable";
import {Project} from "../../../types/models/Project";
import {Page} from "../../../types/models/Page";

@Injectable()
export class Projects {

    /**
     * Projects API service constructor.
     */
    constructor(private http: AppHttpClient) {}

    /**
     * Get all available projects.
     */
    public all(params?: {user_id?: number}): Observable<Project[]> {
        return this.http.get('projects', params);
    }

    /**
     * Get project matching specified id.
     */
    public get(id: number): Observable<Project> {
        return this.http.get('projects/'+id);
    }

    /**
     * Create a new page for specified project.
     */
    public createPage(projectId: number, params: object): Observable<{page: Page}> {
        return this.http.post('projects/'+projectId+'/pages', params);
    }

    /**
     * Delete specified page.
     */
    public deletePage(projectId: number, pageId: number): Observable<any> {
        return this.http.delete('projects/'+projectId+'/pages/'+pageId);
    }

    /**
     * Update specified page.
     */
    public updatePage(projectId: number, pageId: number, params: object): Observable<{page: Page}> {
        return this.http.put('projects/'+projectId+'/pages/'+pageId, params);
    }
}
