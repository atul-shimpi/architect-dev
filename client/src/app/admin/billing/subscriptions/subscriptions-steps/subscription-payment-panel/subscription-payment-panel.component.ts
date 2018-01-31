import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SubscriptionStepperState} from "../../subscription-stepper-state.service";
import {Settings} from "vebto-client/core/services/settings.service";

@Component({
    selector: 'subscription-payment-panel',
    templateUrl: './subscription-payment-panel.component.html',
    styleUrls: ['./subscription-payment-panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SubscriptionPaymentPanelComponent implements OnInit {

    /**
     * SubscriptionPaymentPanelComponent Constructor.
     */
    constructor(
        public state: SubscriptionStepperState,
        public settings: Settings,
    ) {}

    ngOnInit() {
    }

}
