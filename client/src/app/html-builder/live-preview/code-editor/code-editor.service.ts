import {ComponentRef, ElementRef, Injectable} from '@angular/core';
import {Overlay, OverlayRef} from "@angular/cdk/overlay";
import {CodeEditorComponent} from "./code-editor.component";
import {ComponentPortal} from "@angular/cdk/portal";
import {Observable} from "rxjs/Observable";

@Injectable()
export class CodeEditor {

    /**
     * Reference to code editor overlay.
     */
    public overlayRef: OverlayRef;

    /**
     * Origin element for code editor overlay.
     */
    private origin: ElementRef;

    private componentRef: ComponentRef<CodeEditorComponent>;

    /**
     * CodeEditor Constructor.
     */
    constructor(private overlay: Overlay) {}

    public toggle() {
        if (this.overlayRef) {
            this.close();
        } else {
            this.open();
        }
    }

    public open(): Observable<CodeEditorComponent> {
        if (this.overlayRef) return this.componentRef.instance.loaded;

        const strategy = this.overlay.position().connectedTo(
            this.origin,
            {originX: 'end', originY: 'bottom'},
            {overlayX: 'start', overlayY: 'bottom'}
        ).withFallbackPosition(
            {originX: 'end', originY: 'top'},
            {overlayX: 'start', overlayY: 'top'}
        ).withOffsetX(15).withOffsetY(15);

        if (this.overlayRef) this.overlayRef.dispose();

        this.overlayRef = this.overlay.create({positionStrategy: strategy});
        this.componentRef = this.overlayRef.attach(new ComponentPortal(CodeEditorComponent)) as ComponentRef<CodeEditorComponent>;

        const sub = this.componentRef.instance.close.subscribe(() => {
            this.close();
            sub.unsubscribe();
        });

        return this.componentRef.instance.loaded;
    }

    public close() {
        if ( ! this.overlayRef) return;
        this.overlayRef.dispose();
        this.overlayRef = null;
    }

    public registerOrigin(origin: ElementRef) {
        this.origin = origin;
    }
}
