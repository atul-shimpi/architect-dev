import {Page} from "./Page";

export class Template {
	id: number;
	name: string;
	html?: string;
	css?: string;
	js?: string;
	theme?: string;
	user_id?: number;
	thumbnail: string;
	color?: string;
	category?: string;
	created_at?: string;
	updated_at?: string;
	pages?: Page[];

	constructor(params: Object = {}) {
        for (let name in params) {
            this[name] = params[name];
        }
    }
}