import {Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import {LivePreview} from "../../../live-preview.service";
import {InspectorFloatingPanel} from "../../inspector-floating-panel.service";
import {ColorpickerPanelComponent} from "../colorpicker-panel/colorpicker-panel.component";

@Component({
    selector: 'shadows-panel',
    templateUrl: './shadows-panel.component.html',
    styleUrls: ['./shadows-panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ShadowsPanelComponent implements OnInit {
    @ViewChild('colorButton') colorButton: ElementRef;

    public props;

    public sliders = ['angle', 'distance', 'blur', 'spread'];

    /**
     * ShadowsPanelComponent Constructor.
     */
    constructor(
        private livePreview: LivePreview,
        private panel: InspectorFloatingPanel,
        private renderer: Renderer2
    ) {
        this.resetProps();
    }

    ngOnInit() {
        this.livePreview.elementSelected.subscribe(() => {
            if (this.props.type == 'boxShadow') {
                this.stringToProps(this.livePreview.selected.getStyle('boxShadow'));
            } else {
                this.stringToProps(this.livePreview.selected.getStyle('textShadow'));
            }

            this.setColorButtonColor();
        });
    }

    public applyStyle(name: string, value: string, addUndoCommand = true) {
        this.props[name] = value;
        this.livePreview.selected.applyStyle(this.props.type, this.propsToString(this.props), addUndoCommand);
        this.clearShadow(this.props.type === 'boxShadow' ? 'textShadow' : 'boxShadow');
    }

    public clearShadow(type: string) {
        this.livePreview.selected.applyStyle(type, 'none', false);
    }

    public openColorpickerPanel() {
        this.panel.open(ColorpickerPanelComponent, this.colorButton, {closeOnSelected: false}).selected.subscribe(color => {
            this.setColorButtonColor();
            this.applyStyle('color', color);
        });
    }

    private setColorButtonColor() {
        if (this.props.color === 'rgba(0, 0, 0, 0)') return;
        this.renderer.setStyle(this.colorButton.nativeElement, 'backgroundColor', this.props.color);
    }

    private propsToString(props: any) {
        let blur   = Math.round(props.blur),
            spread = Math.round(props.spread),
            angle  = parseInt(props.angle)*((Math.PI)/180),
            x      = Math.round(props.distance * Math.cos(angle)),
            y      = Math.round(props.distance * Math.sin(angle)),
            inset  = props.inset && props.type == 'boxShadow' ? 'inset ' : '',
            css    = inset+x+'px '+y+'px '+blur+'px ';

        //text shadows have no spread property
        if (props.type == 'boxShadow') {
            css += spread+'px ';
        }

        return css+props.color;
    }

    private stringToProps(string: string) {
        if ( ! string || string == 'none') {
            return this.resetProps();
        }

        const array = string.replace(/, /g, ',').split(' ').map(val => {
            return val.indexOf('px') > -1 ? +val.replace('px', '') : val;
        });

        //text shadow
        if (array.length == 4) {
            this.props.color = array[0];
            this.props.angle = array[1];
            this.props.distance = array[2];
            this.props.blur = array[3];
        }

        //box shadow
        else if (array.length == 5 || array.length == 6) {
            this.props.color = array[0];
            this.props.angle = array[1];
            this.props.distance = array[2];
            this.props.blur = array[3];
            this.props.spread = array[4];
        }
    };

    /**
     * Reset shadow props to default state.
     */
    private resetProps() {
        this.props = {
            type: 'boxShadow',
            inset: false,
            angle: 0,
            distance: 5,
            blur: 10,
            color: 'rgba(0, 0, 0, 0.5)',
            spread: 0
        };
    }
}
