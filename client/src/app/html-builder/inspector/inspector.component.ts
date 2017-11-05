import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Inspector} from "./inspector.service";

@Component({
    selector: 'inspector',
    templateUrl: './inspector.component.html',
    styleUrls: ['./inspector.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class InspectorComponent implements OnInit {

    constructor(public inspector: Inspector) {
    }

    ngOnInit() {
    }


}
