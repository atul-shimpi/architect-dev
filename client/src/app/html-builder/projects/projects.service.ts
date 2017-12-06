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
    public all(params?: {user_id?: number}): Observable<{projects: Project[]}> {
        return this.http.get('projects', params);
    }

    /**
     * Get project matching specified id.
     */
    public get(id: number): Observable<{project: Project}> {
        return this.http.get('projects/'+id);
    }

    /**
     * Create a new project.
     */
    public create(params: object): Observable<{project: Project}> {
        return this.http.post('projects', params);
    }

    /**
     * Update project matching specified id.
     */
    public update(id: number, params: object): Observable<{project: Project}> {
        return this.http.put('projects/'+id, params);
    }

    /**
     * Create or update specified project's thumbnail image.
     */
    public generateThumbnail(projectId: number, dataUrl: string): Observable<any> {
        return this.http.post('projects/'+projectId+'/generate-thumbnail', {dataUrl});
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
