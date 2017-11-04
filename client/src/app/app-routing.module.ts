import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {path: '', redirectTo: 'builder', pathMatch: 'full'},
    {path: 'builder', loadChildren: 'app/html-builder/html-builder.module#HtmlBuilderModule'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
