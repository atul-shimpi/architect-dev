import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Theme} from "../../types/models/Theme";
import {HttpCacheClient} from "vebto-client/core/http/http-cache-client";

@Injectable()
export class Themes {

    /**
     * Themes API service constructor.
     */
    constructor(private http: HttpCacheClient) {}

    /**
     * Get all available themes.
     */
    public all(): Observable<{themes: Theme[]}> {
        return this.http.get('themes');
    }
}
