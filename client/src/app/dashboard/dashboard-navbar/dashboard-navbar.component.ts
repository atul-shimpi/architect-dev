import {Component, ViewEncapsulation} from '@angular/core';
import {Settings} from "vebto-client/core/services/settings.service";

@Component({
    selector: 'dashboard-navbar',
    templateUrl: './dashboard-navbar.component.html',
    styleUrls: ['./dashboard-navbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardNavbarComponent {

    /**
     * DashboardNavbarComponent Constructor.
     */
    constructor(public settings: Settings) {}
}
