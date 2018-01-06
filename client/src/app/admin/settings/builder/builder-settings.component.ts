import {Component, ViewEncapsulation} from "@angular/core";
import {SettingsPanelComponent} from "../../../html-builder/inspector/settings-panel/settings-panel.component";

@Component({
    selector: 'builder-settings',
    templateUrl: './builder-settings.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class BuilderSettingsComponent extends SettingsPanelComponent {
}
