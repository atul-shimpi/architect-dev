import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LivePreview} from "../../live-preview.service";

@Component({
    selector: 'inspector-panel',
    templateUrl: './inspector-panel.component.html',
    styleUrls: ['./inspector-panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class InspectorPanelComponent implements OnInit {

    constructor(public livePreview: LivePreview) {
    }

    ngOnInit() {
    }
}
