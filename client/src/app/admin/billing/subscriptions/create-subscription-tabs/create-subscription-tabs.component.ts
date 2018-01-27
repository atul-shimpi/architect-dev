import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'create-subscription-tabs',
    templateUrl: './create-subscription-tabs.component.html',
    styleUrls: ['./create-subscription-tabs.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateSubscriptionTabsComponent implements OnInit {

    @Input() submitText = 'Submit Purchase';

    constructor() {
    }

    ngOnInit() {
    }

}
