import {Component, ViewEncapsulation} from '@angular/core';
import {Overlay} from "@angular/cdk/overlay";
import {Inspector} from "../inspector.service";
import {ActiveProject} from "../../projects/active-project";
import {InspectorDrawer} from "../inspector-drawer.service";

@Component({
    selector: 'settings-panel',
    templateUrl: './settings-panel.component.html',
    styleUrls: ['./settings-panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SettingsPanelComponent {

    constructor(
        private overlay: Overlay,
        private inspector: Inspector,
        public activeProject: ActiveProject,
        private inspectorDrawer: InspectorDrawer,
    ) {}

    public openTemplatesPanel() {
        this.inspectorDrawer.toggle('templates');
    }

    public openThemesPanel() {
        this.inspectorDrawer.toggle('themes');
    }
}
