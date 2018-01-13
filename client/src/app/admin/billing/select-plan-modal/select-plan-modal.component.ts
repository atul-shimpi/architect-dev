import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Plans} from "../plans/plans.service";
import {Plan} from "../plans/plan";
import {Subscriptions} from "../subscriptions/subscriptions.service";
import {finalize} from "rxjs/operators";

@Component({
    selector: 'select-plan-modal',
    templateUrl: './select-plan-modal.component.html',
    styleUrls: ['./select-plan-modal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SelectPlanModalComponent implements OnInit {

    public loading = false;

    /**
     * All available plans.
     */
    public plans: Plan[] = [];

    /**
     * SelectPlanModalComponent Constructor.
     */
    constructor(private plansApi: Plans, private subscriptions: Subscriptions) {
    }

    ngOnInit() {
        this.plansApi.all().subscribe(response => {
            this.plans = response.data;
        });
    }

    public selectPlan(plan: Plan) {
        this.loading = true;

        this.subscriptions.create({plan_id: plan.id})
            .pipe(finalize(() => this.loading = false))
            .subscribe(response => {
                console.log(response);
            });
    }
}
