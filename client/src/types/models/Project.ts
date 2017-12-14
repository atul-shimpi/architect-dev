import {Page} from "./Page";

export class Project {
    id: number;
    name: string;
    published: number = 1;
    public: number = 0;
    uuid?: string;
    pages?: Page[];
    framework: string;
    theme: string;
    template: string;

    constructor(params: Object = {}) {
        for (let name in params) {
            this[name] = params[name];
        }
    }
}