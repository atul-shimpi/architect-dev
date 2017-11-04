import {Injectable} from '@angular/core';
import {AppHttpClient} from "vebto-client/core";
import {Observable} from "rxjs/Observable";
import {Template} from "../../types/models/Template";

@Injectable()
export class Templates {

    /**
     * Templates API service constructor.
     */
    constructor(private http: AppHttpClient) {}

    /**
     * Get all available templates.
     */
    public all(): Observable<Template[]> {
        return this.http.get('templates');
    }
}
