import {Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import {LivePreview} from "../../../live-preview.service";
import {GradientBackgroundPanelComponent} from "./gradient-background-panel/gradient-background-panel.component";
import {InspectorFloatingPanel} from "../../inspector-floating-panel.service";
import {ColorpickerPanelComponent} from "../colorpicker-panel/colorpicker-panel.component";
import {Modal} from "../../../../shared/modal.service";
import {ImageBackgroundPanelComponent} from "./image-background-panel/image-background-panel.component";

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
        private modal: Modal,
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
        this.livePreview.selected.applyStyle(type, this.styles[type], addUndoCommand);
    }
}
