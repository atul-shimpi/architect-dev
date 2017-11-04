import {Library} from "./Library";

export class Page {
	id: number;
	name: string;
	html?: string;
	css?: string;
	js?: string;
	theme: string = 'default';
	pageable_id: number;
	pageable_type: string = 'Project';
	description?: string;
	tags?: string;
	title?: string;
	created_at?: string;
	updated_at?: string;
	libraries?: Library[];
	pageable?: Page;

	constructor(params: Object = {}) {
        for (let name in params) {
            this[name] = params[name];
        }
    }
}