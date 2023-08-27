import type { EmailConfirmation, UserLogin, UserRegister } from '@Types/index';
import axios from 'axios';

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

const Api = {
	login: async (data: UserLogin) => {
		try {
			const response = await axios.post(`${baseUrl}/login`, {
				data
			});
			return response.data;
		} catch (error) {
			console.error('Error:', error);
			throw error;
		}
	},

	signUp: async (data: UserRegister) => {
		try {
			const response = await axios.post(`${baseUrl}/sign_up`, {
				user: {
					data
				}
			});
			return response.data;
		} catch (error) {
			console.error('Error:', error);
			throw error;
		}
	},

	emailConfirmation: async (data: EmailConfirmation) => {
		try {
			const response = await axios.post(`${baseUrl}/email_confirmation`, {
				data
			});
			return response.data;
		} catch (error) {
			console.error('Error:', error);
			throw error;
		}
	}
};

export default Api;
