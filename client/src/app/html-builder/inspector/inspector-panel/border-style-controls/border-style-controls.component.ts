import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LivePreview} from "../../../live-preview.service";

@Component({
    selector: 'border-style-controls',
    templateUrl: './border-style-controls.component.html',
    styleUrls: ['./border-style-controls.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class BorderStyleControlsComponent implements OnInit {

    public borderStyle = 'none';
    public borderColor = '#eee';

    /**
     * BorderStyleControlsComponent Constructor.
     */
    constructor(private livePreview: LivePreview) {}

    ngOnInit() {
        this.livePreview.elementSelected.subscribe(() => {
            this.setInitialBorderStyles()
        });
    }

    /**
     * Apply border color to selected element.
     */
    public applyBorderColor() {
        this.livePreview.selected.applyStyle('borderColor', this.borderColor);
    }

    /**
     * Apply border style to selected element.
     */
    public applyBorderStyle() {
        this.livePreview.selected.applyStyle('borderStyle', this.borderStyle)
    }

    /**
     * Set styles of selected element on component.
     */
    private setInitialBorderStyles() {
        this.borderStyle = this.livePreview.selected.getStyle('borderStyle');
        this.borderColor = this.livePreview.selected.getStyle('borderColor');
    }
}
