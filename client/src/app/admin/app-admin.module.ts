import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TemplatesComponent} from "./templates/templates.component";
import {AppAdminRoutingModule} from "./app-admin-routing.module";
import {AdminModule} from "../../../node_modules/vebto-client/admin/admin.module";
import { CrupdateTemplateModalComponent } from './templates/crupdate-template-modal/crupdate-template-modal.component';

@NgModule({
    imports: [
        CommonModule,
        AdminModule,
        AppAdminRoutingModule,
    ],
    declarations: [
        TemplatesComponent,
        CrupdateTemplateModalComponent,
    ],
    entryComponents: [
        CrupdateTemplateModalComponent,
    ]
})
export class AppAdminModule {
}
