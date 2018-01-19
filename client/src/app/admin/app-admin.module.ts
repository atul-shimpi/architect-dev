import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TemplatesComponent} from "./templates/templates.component";
import {AppAdminRoutingModule} from "./app-admin-routing.module";
import {AdminModule} from "../../../node_modules/vebto-client/admin/admin.module";
import { CrupdateTemplateModalComponent } from './templates/crupdate-template-modal/crupdate-template-modal.component';
import { ProjectsComponent } from './projects/projects.component';
import { CrupdateProjectModalComponent } from './projects/crupdate-project-modal/crupdate-project-modal.component';
import {BuilderSettingsComponent} from "./settings/builder/builder-settings.component";
import {BillingModule} from "./billing/billing.module";
import {BillingSettingsComponent} from "./settings/billing/billing-settings.component";

@NgModule({
    imports: [
        CommonModule,
        AdminModule,
        AppAdminRoutingModule,

        //import into vebto-client admin mode after billing is done
        BillingModule,
    ],
    declarations: [
        TemplatesComponent,
        CrupdateTemplateModalComponent,
        ProjectsComponent,
        CrupdateProjectModalComponent,
        BuilderSettingsComponent,
        BillingSettingsComponent,
    ],
    entryComponents: [
        CrupdateTemplateModalComponent,
        CrupdateProjectModalComponent,
    ]
})
export class AppAdminModule {
}
