import {Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import Quill from "quill";
import {Overlay} from "@angular/cdk/overlay";
import {ComponentPortal} from "@angular/cdk/portal";
import {InspectorFloatingPanel} from "../../inspector/inspector-floating-panel.service";
import {GradientBackgroundPanelComponent} from "../../inspector/inspector-panel/background-panel/gradient-background-panel/gradient-background-panel.component";

@Component({
    selector: 'inline-text-editor',
    templateUrl: './inline-text-editor.component.html',
    styleUrls: ['./inline-text-editor.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class InlineTextEditorComponent implements OnInit {

    private editor;

    constructor(private overlay: Overlay) {
    }

    ngOnInit() {
        this.showTextEditor();
    }

    private showTextEditor() {
        this.editor = new Quill('#editor', {
            modules: { toolbar: '#toolbar' },
            theme: 'snow'
        });
    }

    public position(node: HTMLElement) {
        let ref = new ElementRef(node);

        const strategy = this.overlay.position().connectedTo(
            ref,
            {originX: 'end', originY: 'top'},
            {overlayX: 'center', overlayY: 'bottom'}
        ).withOffsetX(25);

        let overlayRef = this.overlay.create({positionStrategy: strategy, hasBackdrop: true});

        overlayRef.backdropClick().subscribe(() => overlayRef.dispose());

        let componentRef = overlayRef.attach(new ComponentPortal(GradientBackgroundPanelComponent));

        this.editor.clipboard.dangerouslyPasteHTML(node.textContent);
    }

}
