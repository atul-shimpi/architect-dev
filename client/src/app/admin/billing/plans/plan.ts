export class Plan {
    id: number;
    name: string;
    amount: number;
    currency: string;
    interval: string;
    permissions: object = {};
    recommended: 0|1 = 0;
    show_permissions: 0|1 = 0;
    free: 0|1 = 0;
    position: number = 0;
    features: string[] = [];

    constructor(params: Object = {}) {
        for (let name in params) {
            this[name] = params[name];
        }
    }
}