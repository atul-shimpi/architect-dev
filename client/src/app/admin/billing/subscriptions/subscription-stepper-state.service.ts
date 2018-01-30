import {Injectable} from "@angular/core";
import {Plan} from "../plans/plan";

@Injectable()
export class SubscriptionStepperState {

    /**
     * All available plans.
     */
    public plans: Plan[] = [];

    /**
     * Billing plan user has selected.
     */
    public selectedPlan: Plan;

    /**
     * Child of main plan user has selected, for example yearly plan.
     */
    public selectedPlanChild: Plan;

    /**
     * Interval (in months) user selected to be charged on.
     */
    public selectedPlanId: number = 12;

    /**
     * Get plan user should be subscribed to.
     */
    public getFinalPlan() {
        return this.selectedPlanChild || this.selectedPlan;
    }

    /**
     * Select specified plan.
     */
    public selectPlan(plan: Plan) {
        this.selectedPlan = plan;
    }

    /**
     * Select child plan by specified ID.
     */
    public selectChildPlan(id: number) {
        this.selectedPlanChild = this.plans.find(plan => plan.id === id);
        this.selectedPlanId = id;
    }

    /**
     * Get different versions of specified plan.
     * (yearly, weekly, every 2 years etc)
     */
    public getChildPlans(parent: Plan) {
        return this.plans.filter(plan => plan.parent_id === parent.id);
    }

    /**
     * Set all available plans.
     */
    public setPlans(plans: Plan[]) {
        this.plans = plans;
    }
}