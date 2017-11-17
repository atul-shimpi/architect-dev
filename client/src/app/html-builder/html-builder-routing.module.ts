import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HtmlBuilderComponent} from "./html-builder/html-builder.component";
import {CustomElementsResolver} from "./elements/custom-elements-resolver.service";

const routes: Routes = [
    {path: '', component: HtmlBuilderComponent, resolve: {customElements: CustomElementsResolver}}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HtmlBuilderRoutingModule {
}
