import {Component, ViewEncapsulation} from "@angular/core";
import {SettingsPanelComponent} from "vebto-client/admin/settings/settings-panel.component";

@Component({
    selector: 'billing-settings',
    templateUrl: './billing-settings.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class BillingSettingsComponent extends SettingsPanelComponent {
}
