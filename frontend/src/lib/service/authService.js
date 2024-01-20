import { TOKEN_TYPE, TokenService } from "./tokenService";
import { redirect } from "react-router-dom";
import axios from 'axios'
import { AuthApi } from "../api/authApi";


export class AuthService {
	static userLogout() {
		TokenService.removeToken(TOKEN_TYPE.ACCESS);
		TokenService.removeToken(TOKEN_TYPE.REFRESH);
		return redirect("/auth/signin");
	}
    static checkAuth(){
        const token = TokenService.loadToken(TOKEN_TYPE.ACCESS)
        if(!token) return null
        else return token
    }
    static async refreshAccessToken(){
        try {
			// Make the refresh token request to your backend to get a new access token
			const refreshToken = TokenService.loadToken(TOKEN_TYPE.REFRESH);
			//throw error if token value is undefined/null
			if (!refreshToken) throw Error;
			const response =
				await AuthApi.refreshToken({
					refresh: refreshToken,
				});
			// Save the new access token in localStorage
			TokenService.setToken(response.data.access, TOKEN_TYPE.ACCESS)
			// Update the Authorization header with the new access token
			axios.defaults.headers.common[
				"Authorization"
			] = `Bearer ${response.data.access}`;

			return Promise.resolve();
		} catch (error) {
			return Promise.reject(error);
		}
    }
}
