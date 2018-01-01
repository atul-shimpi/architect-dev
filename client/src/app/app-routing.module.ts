import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CustomPageComponent} from "vebto-client/core/ui/custom-page/custom-page.component";

const routes: Routes = [
    {path: '', component: CustomPageComponent},
    {path: 'builder', loadChildren: 'app/html-builder/html-builder.module#HtmlBuilderModule'},
    {path: 'admin', loadChildren: 'app/admin/app-admin.module#AppAdminModule'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
