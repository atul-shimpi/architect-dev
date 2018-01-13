export class Subscription {
    id: number;
    plan_id: number;
    user_id: number;
    trial_end_at: string;
    end_at: string;

    constructor(params: Object = {}) {
        for (let name in params) {
            this[name] = params[name];
        }
    }
}