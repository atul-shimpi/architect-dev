import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LivePreview} from "../../../live-preview.service";
import {SelectedElement} from "../../../live-preview/selected-element.service";

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
    constructor(private selected: SelectedElement) {}

    ngOnInit() {
        this.selected.changed.subscribe(() => {
            this.setInitialBorderStyles()
        });
    }

    /**
     * Apply border color to selected element.
     */
    public applyBorderColor() {
        this.selected.applyStyle('borderColor', this.borderColor);
    }

    /**
     * Apply border style to selected element.
     */
    public applyBorderStyle() {
        this.selected.applyStyle('borderStyle', this.borderStyle)
    }

    /**
     * Set styles of selected element on component.
     */
    private setInitialBorderStyles() {
        this.borderStyle = this.selected.getStyle('borderStyle');
        this.borderColor = this.selected.getStyle('borderColor');
    }
}
