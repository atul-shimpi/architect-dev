import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Overlay} from "@angular/cdk/overlay";
import {Inspector} from "../inspector.service";
import {ActiveProject} from "../../projects/active-project";
import {InspectorDrawer} from "../inspector-drawer.service";
import {LivePreviewLoader} from "../../live-preview/live-preview-loader.service";

@Component({
    selector: 'settings-panel',
    templateUrl: './settings-panel.component.html',
    styleUrls: ['./settings-panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SettingsPanelComponent implements OnInit {

    public selectedFramework: string;

    constructor(
        private overlay: Overlay,
        private inspector: Inspector,
        public activeProject: ActiveProject,
        private inspectorDrawer: InspectorDrawer,
        public loader: LivePreviewLoader,
    ) {}

    ngOnInit() {
        this.hydrateModels();
    }

    /**
     * Change project's framework.
     */
    public changeFramework(name: string) {
        this.loader.show();

        this.activeProject.changeFramework(name).then(() => {
            this.loader.hide();
        });
    }

    public openTemplatesPanel() {
        this.inspectorDrawer.toggle('templates');
    }

    public openThemesPanel() {
        this.inspectorDrawer.toggle('themes');
    }

    private hydrateModels() {
        this.selectedFramework = this.activeProject.get().model.framework;
    }
}
