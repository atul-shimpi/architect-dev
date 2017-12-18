import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {SelectedElement} from "../../../live-preview/selected-element.service";
import {ColorpickerPanelComponent} from "../colorpicker-panel/colorpicker-panel.component";
import {InspectorFloatingPanel} from "../../inspector-floating-panel.service";
import {BuilderDocumentActions} from "../../../builder-document-actions.service";

@Component({
    selector: 'border-style-controls',
    templateUrl: './border-style-controls.component.html',
    styleUrls: ['./border-style-controls.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class BorderStyleControlsComponent implements OnInit {
    @ViewChild('colorButton') colorButton: ElementRef;

    public borderStyle = 'none';
    public borderColor = '#eee';

    /**
     * BorderStyleControlsComponent Constructor.
     */
    constructor(
        private selected: SelectedElement,
        private panel: InspectorFloatingPanel,
        private builderActions: BuilderDocumentActions,
    ) {}

    ngOnInit() {
        this.selected.changed.subscribe(() => {
            this.setInitialBorderStyles()
        });
    }

    /**
     * Apply border color to selected element.
     */
    public applyBorderColor(color: string) {
        this.borderColor = color;
        this.builderActions.applyStyle(this.selected.node, 'borderColor', color);
    }

    /**
     * Apply border style to selected element.
     */
    public applyBorderStyle() {
        this.builderActions.applyStyle(this.selected.node, 'borderStyle', this.borderStyle)
    }

    /**
     * Open color picker panel and update border color.
     */
    public openColorpickerPanel() {
        this.panel.open(ColorpickerPanelComponent, this.colorButton, {closeOnSelected: false}).selected.subscribe(color => {
            this.applyBorderColor(color);
        });
    }

    /**
     * Set styles of selected element on component.
     */
    private setInitialBorderStyles() {
        this.borderStyle = this.selected.getStyle('borderStyle');
        this.borderColor = this.selected.getStyle('borderColor');
    }
}
