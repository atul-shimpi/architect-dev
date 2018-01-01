import {Injectable} from '@angular/core';
import {AppHttpClient} from "vebto-client/core/http/app-http-client.service";
import {Observable} from "rxjs/Observable";
import {BuilderTemplate} from "../html-builder/builder-types";
import {PaginationResponse} from "../../../node_modules/vebto-client/core/types/pagination-response";

@Injectable()
export class Templates {

    /**
     * Templates API service constructor.
     */
    constructor(private http: AppHttpClient) {}

    /**
     * Get all available templates.
     */
    public all(): Observable<PaginationResponse<BuilderTemplate>> {
        return this.http.get('templates');
    }

    /**
     * Get template by specified id.
     */
    public get(name: string): Observable<{template: BuilderTemplate}> {
        return this.http.get('templates/'+name);
    }

    /**
     * Create a new template.
     */
    public create(params: object): Observable<{template: BuilderTemplate}> {
        return this.http.post('templates', params);
    }

    /**
     * Update specified template.
     */
    public update(name: string, params: object): Observable<{template: BuilderTemplate}> {
        return this.http.post('templates/'+name, params);
    }

    /**
     * Delete specified templates.
     */
    public delete(names: string[]): Observable<any> {
        return this.http.delete('templates', {names});
    }
}
