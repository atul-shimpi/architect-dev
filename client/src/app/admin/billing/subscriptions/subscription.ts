import {Plan} from "../plans/plan";

export class Subscription {
    id: number;
    plan_id: number;
    user_id: number;
    on_grace_period?: boolean;
    valid?: boolean;
    on_trial?: boolean;
    plan?: Plan;
    trial_ends_at: string;
    ends_at: string;
    renews_at: string;

    constructor(params: Object = {}) {
        for (let name in params) {
            this[name] = params[name];
        }
    }
}