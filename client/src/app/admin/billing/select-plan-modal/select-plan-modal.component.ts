import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Plans} from "../plans/plans.service";
import {Plan} from "../plans/plan";

@Component({
    selector: 'select-plan-modal',
    templateUrl: './select-plan-modal.component.html',
    styleUrls: ['./select-plan-modal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SelectPlanModalComponent implements OnInit {

    /**
     * All available plans.
     */
    public plans: Plan[] = [];

    constructor(private plansApi: Plans) {
    }

    ngOnInit() {
        this.plansApi.all().subscribe(response => {
            this.plans = response.data;
        });
    }
}
