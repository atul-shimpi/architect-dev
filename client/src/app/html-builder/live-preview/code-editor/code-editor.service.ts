import {ElementRef, Injectable} from '@angular/core';
import {Overlay, OverlayRef} from "@angular/cdk/overlay";
import {CodeEditorComponent} from "./code-editor.component";
import {ComponentPortal} from "@angular/cdk/portal";

@Injectable()
export class CodeEditor {

    /**
     * Reference to code editor overlay.
     */
    public overlayRef: OverlayRef;

    constructor(private overlay: Overlay) {
    }

    public toggle(ref: ElementRef) {
        if (this.overlayRef) {
            this.close();
        } else {
            this.open(ref);
        }
    }

    public open(ref: ElementRef) {
        if (this.overlayRef) return;

        const strategy = this.overlay.position().connectedTo(
            ref,
            {originX: 'end', originY: 'bottom'},
            {overlayX: 'start', overlayY: 'bottom'}
        ).withFallbackPosition(
            {originX: 'end', originY: 'top'},
            {overlayX: 'start', overlayY: 'top'}
        ).withOffsetX(15).withOffsetY(15);

        if (this.overlayRef) this.overlayRef.dispose();

        this.overlayRef = this.overlay.create({positionStrategy: strategy, hasBackdrop: false});
        const componentRef = this.overlayRef.attach(new ComponentPortal(CodeEditorComponent));

        const sub = componentRef.instance.close.subscribe(() => {
            this.close();
            sub.unsubscribe();
        });
    }

    public close() {
        if ( ! this.overlayRef) return;
        this.overlayRef.dispose();
        this.overlayRef = null;
    }

}
