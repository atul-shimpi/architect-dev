import {Injectable} from '@angular/core';
import {AppHttpClient} from "vebto-client/core/index";
import {Observable} from "rxjs/Observable";
import {Theme} from "../../types/models/Theme";

@Injectable()
export class Themes {

    /**
     * Themes API service constructor.
     */
    constructor(private http: AppHttpClient) {}

    /**
     * Get all available themes.
     */
    public all(): Observable<{themes: Theme[]}> {
        return this.http.get('themes');
    }
}
