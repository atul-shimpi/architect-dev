import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HtmlBuilderComponent} from "./html-builder/html-builder.component";

const routes: Routes = [
    {path: '', component: HtmlBuilderComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HtmlBuilderRoutingModule {
}
