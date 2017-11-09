import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LivePreview} from "../../../live-preview.service";
import {baseFonts, fontWeights} from "../../../text-style-values";

@Component({
    selector: 'text-style-panel',
    templateUrl: './text-style-panel.component.html',
    styleUrls: ['./text-style-panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TextStylePanelComponent implements OnInit {

    public styles: any = {};

    public baseFonts = baseFonts.slice();

    public fontWeights = fontWeights.slice();

    /**
     * TextStylePanelComponent Constructor.
     */
    constructor(private livePreview: LivePreview) {
    }

    ngOnInit() {
        this.livePreview.elementSelected.subscribe(() => {
            this.getSelectedElementTextStyles();
        });
    }

    public applyTextStyle(name: string, addUndoCommand = true) {
        this.livePreview.selected.applyStyle(name, this.styles[name], addUndoCommand);
    }

    /**
     * Toggle between specified style and "initial".
     */
    public toggleTextStyle(name: string, value: string) {
        if (this.textStyleIs(name, value)) {
            this.livePreview.selected.applyStyle(name, 'initial');
        } else {
            this.livePreview.selected.applyStyle(name, value);
        }
    }

    /**
     * Check if selected element's specified style equals given value.
     */
    public textStyleIs(name: string, value: string) {
        return this.livePreview.selected.getStyle(name).indexOf(value) > -1;
    }

    /**
     * Get current text styles of element selected in the builder.
     */
    private getSelectedElementTextStyles() {
        this.styles = {
            color: this.livePreview.selected.getStyle('color'),
            fontSize: this.livePreview.selected.getStyle('fontSize').replace('px', ''),
            textAlign: this.livePreview.selected.getStyle('textAlign'),
            fontStyle: this.livePreview.selected.getStyle('fontStyle'),
            fontFamily: this.livePreview.selected.getStyle('fontFamily'),
            lineHeight: this.livePreview.selected.getStyle('lineHeight'),
            fontWeight: this.livePreview.selected.getStyle('fontWeight'),
            textDecoration: this.livePreview.selected.getStyle('textDecoration')
        };

        console.log(this.styles);
    }
}
