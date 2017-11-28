import {Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import {GradientBackgroundPanelComponent} from "./gradient-background-panel/gradient-background-panel.component";
import {InspectorFloatingPanel} from "../../inspector-floating-panel.service";
import {ColorpickerPanelComponent} from "../colorpicker-panel/colorpicker-panel.component";
import {ImageBackgroundPanelComponent} from "./image-background-panel/image-background-panel.component";
import {SelectedElement} from "../../../live-preview/selected-element.service";

@Component({
    selector: 'background-panel',
    templateUrl: './background-panel.component.html',
    styleUrls: ['./background-panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class BackgroundPanelComponent implements OnInit {
    @ViewChild('gradientButton') gradientButton: ElementRef;
    @ViewChild('backgroundButton') backgroundButton: ElementRef;

    public styles = {
        backgroundImage: '',
        backgroundColor: '',
    };

    /**
     * BackgroundPanelComponent Constructor.
     */
    constructor(
        private selectedElement: SelectedElement,
        private panel: InspectorFloatingPanel,
        private renderer: Renderer2,
    ) {}

    ngOnInit() {
        this.selectedElement.changed.subscribe(() => {
            this.styles.backgroundImage = this.selectedElement.getStyle('backgroundImage');
            this.styles.backgroundColor = this.selectedElement.getStyle('backgroundColor');
            this.setBackgroundButtonColor();
        });
    }

    public openGradientPanel() {
        this.panel.open(GradientBackgroundPanelComponent, this.gradientButton).selected.subscribe(gradient => {
            this.setBackgroundButtonColor();
            this.applyBackgroundStyle('backgroundImage', gradient);
        });
    }

    public openColorpickerPanel() {
        this.panel.open(ColorpickerPanelComponent, this.gradientButton, {closeOnSelected: false}).selected.subscribe(color => {
            this.setBackgroundButtonColor();
            this.applyBackgroundStyle('backgroundColor', color);
        });
    }

    public openBackgroundPanel() {
        this.panel.open(ImageBackgroundPanelComponent, this.gradientButton).selected.subscribe(url => {
            this.applyBackgroundStyle('backgroundImage', 'url('+url+')');
        });
    }

    private setBackgroundButtonColor() {
        if (this.styles.backgroundColor === 'rgba(0, 0, 0, 0)') return;
        this.renderer.setStyle(this.backgroundButton.nativeElement, 'backgroundColor', this.styles.backgroundColor);
    }

    public applyBackgroundStyle(type: string, value, addUndoCommand = true) {
        this.styles[type] = value;
        this.selectedElement.applyStyle(type, this.styles[type], addUndoCommand);
    }
}
