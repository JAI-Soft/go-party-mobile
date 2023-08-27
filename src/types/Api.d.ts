export interface UserRegister {
	email: string;
	password: string;
	first_name: string;
	surname: string;
	birthday: string;
	username: string;
	password: string;
	password_confirmation: string;
}

export interface UserLogin {
	email: string;
	password: string;
}

export interface EmailConfirmation {
	email: string;
	code: string;
}
