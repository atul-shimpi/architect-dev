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
     * ID of currently selected plan interval.
     */
    public selectedChildPlanId: number = 12;

    /**
     * Get plan user should be subscribed to.
     */
    public getFinalPlan() {
        return this.selectedPlanChild || this.selectedPlan;
    }

    /**
     * Check if a plan is selected.
     */
    public planIsSelected(): boolean {
        return this.selectedPlan != null;
    }

    /**
     * Check if user has selected plan interval.
     */
    public childPlanIsSelected(): boolean {
        return this.selectedPlanChild != null;
    }

    /**
     * Select specified plan.
     */
    public selectPlan(plan: Plan) {
        if (this.selectedPlan === plan) return;

        this.selectedPlan = plan;

        const children = this.getChildPlans(plan);

        if (children.length) {
            this.selectChildPlan(children[0].id);
        } else {
            this.selectedPlanChild = null;
            this.selectedChildPlanId = null;
        }
    }

    /**
     * Select child plan by specified ID.
     */
    public selectChildPlan(id: number) {
        this.selectedPlanChild = this.plans.find(plan => plan.id === id);
        this.selectedChildPlanId = id;
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