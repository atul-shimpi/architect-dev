import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'colorpicker-panel',
    templateUrl: './colorpicker-panel.component.html',
    styleUrls: ['./colorpicker-panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ColorpickerPanelComponent implements OnInit {
    @ViewChild('trigger') trigger: ElementRef;

    @Output() public selected = new EventEmitter();

    /**
     * Fired when close button is clicked.
     */
    @Output() public closed = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
        setTimeout(() => {
            this.trigger.nativeElement.click();
        });
    }

    public emitSelectedEvent(value: string) {
        this.selected.emit(value);
    }

    public emitClosedEvent(value: string) {
        this.closed.emit(value);
    }

}
