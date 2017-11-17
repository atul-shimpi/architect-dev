import {Component, ElementRef, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {LivePreview} from "../../../live-preview.service";

@Component({
    selector: 'drag-visual-helper',
    templateUrl: './drag-visual-helper.component.html',
    styleUrls: ['./drag-visual-helper.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DragVisualHelperComponent implements OnInit {

    constructor(public livePreview: LivePreview, private renderer: Renderer2, private el: ElementRef) {
    }

    ngOnInit() {

    }

    public getName() {
        return this.livePreview.selected.element && this.livePreview.selected.element.name;
    }

    public reposition(y: number, x: number) {
        //offset drag helper a bit, so it's in top right corner of cursor
        this.renderer.setStyle(this.el.nativeElement, 'top', y - 35 + 'px');
        this.renderer.setStyle(this.el.nativeElement, 'left', x + 10 + 'px');
    }

    public show() {
        this.renderer.removeClass(this.el.nativeElement, 'hidden');
    }

    public hide() {
        this.renderer.addClass(this.el.nativeElement, 'hidden');
    }

}
