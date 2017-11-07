import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'spacing-panel',
    templateUrl: './spacing-panel.component.html',
    styleUrls: ['./spacing-panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SpacingPanelComponent implements OnInit {

    @Input() type: 'padding'|'margin' = 'padding';

    public enabledSides: string[] = ['top', 'right', 'bottom', 'left'];

    constructor() {
    }

    ngOnInit() {
    }

    public toggleSide(name: string) {
        if (name === 'all') {
            if (this.enabledSides.length > 0) {
                this.enabledSides = [];
            } else {
                this.enabledSides = ['top', 'right', 'bottom', 'left'];
            }
        } else {
            if (this.isSideEnabled(name)) {
                this.enabledSides.splice(this.enabledSides.indexOf(name), 1);
            } else {
                this.enabledSides.push(name);
            }
        }
    }

    public isSideEnabled(name: string) {
        if (name === 'all') return this.enabledSides.length === 4;
        return this.enabledSides.indexOf(name) > -1;
    }

}
