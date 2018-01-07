import {Component, ViewEncapsulation} from "@angular/core";
import {SettingsPanelComponent} from "vebto-client/admin/settings/settings-panel.component";

@Component({
    selector: 'builder-settings',
    templateUrl: './builder-settings.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class BuilderSettingsComponent extends SettingsPanelComponent {
}
