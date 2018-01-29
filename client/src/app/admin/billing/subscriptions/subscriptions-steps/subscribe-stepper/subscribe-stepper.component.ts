import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Settings} from "vebto-client/core/services/settings.service";

@Component({
    selector: 'subscribe-stepper',
    templateUrl: './subscribe-stepper.component.html',
    styleUrls: ['./subscribe-stepper.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SubscribeStepperComponent implements OnInit {

    constructor(public settings: Settings) {
    }

    ngOnInit() {
    }

}
