export class Plan {
    id: number;
    name: string;
    amount: number;
    currency: string;
    interval: string;
    permissions: object = {};

    constructor(params: Object = {}) {
        for (let name in params) {
            this[name] = params[name];
        }
    }
}