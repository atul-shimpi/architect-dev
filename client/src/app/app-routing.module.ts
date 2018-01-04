import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "../../node_modules/vebto-client/auth/login/login.component";
import {GuestGuard} from "../../node_modules/vebto-client/guards/guest-guard.service";

const routes: Routes = [
    {path: '', component: LoginComponent, canActivate: [GuestGuard]},
    {path: 'builder', loadChildren: 'app/html-builder/html-builder.module#HtmlBuilderModule'},
    {path: 'admin', loadChildren: 'app/admin/app-admin.module#AppAdminModule'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
