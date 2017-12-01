import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HtmlBuilderComponent} from "./html-builder/html-builder.component";
import {CustomElementsResolver} from "./elements/custom-elements-resolver.service";
import {ProjectResolver} from "./project-resolver.service";

const routes: Routes = [
    {path: ':id', component: HtmlBuilderComponent, resolve: {customElements: CustomElementsResolver, project: ProjectResolver}}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HtmlBuilderRoutingModule {
}
