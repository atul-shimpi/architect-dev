import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {ContextMenu} from "vebto-client/core/ui/context-menu/context-menu.service";

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import "rxjs/add/operator/share";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/finally";
import "rxjs/add/observable/throw";
import "rxjs/add/observable/forkJoin";
import "rxjs/add/operator/startWith";
import {Settings} from "vebto-client/core/services/settings.service";
import {AppHttpClient} from "vebto-client/core/http/app-http-client.service";
import {CustomHomepage} from "vebto-client/core/services/custom-homepage.service";
import {VebtoConfig} from "vebto-client/core/vebto-config.service";
import {Router} from "@angular/router";
import {appConfig} from "./app-config";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    @ViewChild('contextMenuViewRef', {read: ViewContainerRef}) contextMenuViewRef;
    @ViewChild('contextMenuOrigin') contextMenuOrigin: ElementRef;

    constructor(
        private contextMenu: ContextMenu,
        private customHomepage: CustomHomepage,
        private settings: Settings,
        private httpClient: AppHttpClient,
        private vebtoConfig: VebtoConfig,
        private router: Router,
    ) {}

    ngOnInit() {
        this.contextMenu.registerViewContainerRef(this.contextMenuViewRef, this.contextMenuOrigin);
        this.customHomepage.select();
        this.settings.setHttpClient(this.httpClient);

        this.vebtoConfig.merge(appConfig);

        this.setInjectorOnAppearanceEditorIframe();
    }

    private setInjectorOnAppearanceEditorIframe() {
        if (window.top === window.self) return;
        if (window.top.location.origin !== this.settings.getBaseUrl().replace(/\/$/, '')) return;
        window['previewAngular'] = {settings: this.settings, router: this.router};
    }
}
