import {Page} from "./Page";

export class Library {
	id: number;
	name: string;
	path: string;
	type: string = 'public';
	user_id?: number;
	created_at?: string;
	updated_at?: string;
	pages?: Page[];

	constructor(params: Object = {}) {
        for (let name in params) {
            this[name] = params[name];
        }
    }
}