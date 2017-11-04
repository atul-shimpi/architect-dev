export class User {
	id: number;
	email: string;
	password: string;
	permissions?: string;
	activated: boolean;
	activation_code?: string;
	activated_at?: string;
	last_login?: string;
	persist_code?: string;
	reset_password_code?: string;
	first_name?: string;
	last_name?: string;
	created_at?: string;
	updated_at?: string;

	constructor(params: Object = {}) {
        for (let name in params) {
            this[name] = params[name];
        }
    }
}