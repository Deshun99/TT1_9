import axios from "axios";
import { TOKEN_TYPE, TokenService } from "../service/tokenService";
import { redirect } from "react-router-dom";

export class AuthApi {
	static async refreshToken(data) {
		return await axios.post("/api/auth/refresh", data);
	}
	static async signIn({ request }) {
		try {
			const data = await request.formData();
			const authData = {
				username: data.get("username"),
				password: data.get("password"),
			};
			const response = await axios.post("/api/auth/signin", authData);
			const tokenData = response.data;
			TokenService.setToken(TOKEN_TYPE.ACCESS, tokenData.token);
			TokenService.setToken(TOKEN_TYPE.REFRESH, tokenData.refresh);

			return redirect("/");
		} catch (error) {
			if (error.response) {
				return error.response;
			} else {
				throw error;
			}
		}
	}
	static async signUp({ request }) {
		try {
			const data = await request.formData();
			const registrationData = {
				name: data.get("name"),
				username: data.get("username"),
				email: data.get("email"),
				password: data.get("password"),
				phoneNum: data.get("phoneNum"),
			};

			const response = await axios.post(
				"/api/auth/signup",
				registrationData
			);
			const tokenData = response.data;

			TokenService.setToken(TOKEN_TYPE.ACCESS, tokenData.token);

			return redirect("/");
		} catch (error) {
			if (error.response) {
				return error.response;
			} else {
				throw error;
			}
		}
	}
}
