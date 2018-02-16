import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TemplatesComponent} from "./templates/templates.component";
import {AppAdminRoutingModule} from "./app-admin-routing.module";
import {AdminModule} from "vebto-client/admin/admin.module";
import { CrupdateTemplateModalComponent } from './templates/crupdate-template-modal/crupdate-template-modal.component';
import { ProjectsComponent } from './projects/projects.component';
import { CrupdateProjectModalComponent } from './projects/crupdate-project-modal/crupdate-project-modal.component';
import {BuilderSettingsComponent} from "./settings/builder/builder-settings.component";
import {BillingModule} from "./billing/billing.module";
import {BillingSettingsComponent} from "./settings/billing/billing-settings.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AdminModule,
        AppAdminRoutingModule,

        //import into vebto-client admin mode after billing is done
        //BillingModule,
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
