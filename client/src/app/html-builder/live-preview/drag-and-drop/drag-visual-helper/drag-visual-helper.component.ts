import {Component, ElementRef, NgZone, Renderer2, ViewEncapsulation} from '@angular/core';
import {LivePreview} from "../../../live-preview.service";

@Component({
    selector: 'drag-visual-helper',
    templateUrl: './drag-visual-helper.component.html',
    styleUrls: ['./drag-visual-helper.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DragVisualHelperComponent {

    private element;

    /**
     * DragVisualHelperComponent Constructor.
     */
    constructor(
        public livePreview: LivePreview,
        private renderer: Renderer2,
        private el: ElementRef,
        private zone: NgZone
    ) {}

    public getName() {
        return this.element && this.element.name;
    }

    public reposition(y: number, x: number) {
        //offset drag helper a bit, so it's in top right corner of cursor
        this.renderer.setStyle(this.el.nativeElement, 'top', y - 8 + 'px');
        this.renderer.setStyle(this.el.nativeElement, 'left', x + 20 + 'px');
    }

    public show(element: any) {
        this.zone.run(() => this.element = element);
        this.renderer.removeClass(this.el.nativeElement, 'hidden');
    }

    public hide() {
        this.renderer.addClass(this.el.nativeElement, 'hidden');
    }
}