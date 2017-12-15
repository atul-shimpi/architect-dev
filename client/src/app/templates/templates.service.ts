import {Injectable} from '@angular/core';
import {AppHttpClient} from "vebto-client/core";
import {Observable} from "rxjs/Observable";
import {BuilderTemplate} from "../html-builder/builder-types";

@Injectable()
export class Templates {

    /**
     * Templates API service constructor.
     */
    constructor(private http: AppHttpClient) {}

    /**
     * Get all available templates.
     */
    public all(): Observable<{templates: BuilderTemplate[]}> {
        return this.http.get('templates');
    }

    /**
     * Get template by specified id.
     */
    public get(name: string): Observable<{template: BuilderTemplate}> {
        return this.http.get('templates/'+name);
    }
}
