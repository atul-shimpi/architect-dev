import {Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import {LivePreview} from "../../../live-preview.service";
import {GradientBackgroundPanelComponent} from "./gradient-background-panel/gradient-background-panel.component";
import {InspectorFloatingPanel} from "../../inspector-floating-panel.service";
import {ColorpickerPanelComponent} from "../colorpicker-panel/colorpicker-panel.component";

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
        private livePreview: LivePreview,
        private panel: InspectorFloatingPanel,
        private renderer: Renderer2,
    ) {}

    ngOnInit() {
        this.livePreview.elementSelected.subscribe(() => {
            this.styles.backgroundImage = this.livePreview.selected.getStyle('backgroundImage');
            this.styles.backgroundColor = this.livePreview.selected.getStyle('backgroundColor');
            this.setBackgroundButtonColor();
        });
    }

    public openGradientPanel() {
        this.panel.open(GradientBackgroundPanelComponent, this.gradientButton).selected.subscribe(gradient => {
            this.styles.backgroundImage = gradient;
            this.setBackgroundButtonColor();
            this.applyBackgroundStyle('backgroundImage');
        });
    }

    public openColorpickerPanel() {
        this.panel.open(ColorpickerPanelComponent, this.gradientButton, {closeOnSelected: false}).selected.subscribe(color => {
            this.styles.backgroundColor = color;
            this.setBackgroundButtonColor();
            this.applyBackgroundStyle('backgroundColor');
        });
    }

    private setBackgroundButtonColor() {
        if (this.styles.backgroundColor === 'rgba(0, 0, 0, 0)') return;
        this.renderer.setStyle(this.backgroundButton.nativeElement, 'backgroundColor', this.styles.backgroundColor);
    }

    public applyBackgroundStyle(type: string, addUndoCommand = true) {
        this.livePreview.selected.applyStyle(type, this.styles[type], addUndoCommand);
    }
}
