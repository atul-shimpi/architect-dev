export class Project {
    id: number;
    name: string;
    published: number = 1;
    public: number = 0;
    uuid?: string;
    framework: string = '';
    theme: string = '';
    template: string = '';

    constructor(params: Object = {}) {
        for (let name in params) {
            this[name] = params[name];
        }
    }
}