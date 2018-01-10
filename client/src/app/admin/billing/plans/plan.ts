export class Plan {
    id: number;
    name: string;
    amount: number;
    currency: string;
    interval: string;

    constructor(params: Object = {}) {
        for (let name in params) {
            this[name] = params[name];
        }
    }
}