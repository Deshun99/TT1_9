import axios from "axios";
import { TOKEN_TYPE, TokenService } from "../service/tokenService";
import { redirect } from "react-router-dom";
import { AuthService } from "../service/authService";

// Add a request interceptor to attach the access token to each request
axios.interceptors.request.use(
	(config) => {
		const authToken = TokenService.loadToken(TOKEN_TYPE.ACCESS);
		if (authToken) {
			config.headers["Authorization"] = `Bearer ${authToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Add a response interceptor to handle token refresh
axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		const authToken = TokenService.loadToken(TOKEN_TYPE.ACCESS);

		// If the response status is 401 and there's an authToken, try to refresh the token
		if (error.response.status === 401 && authToken) {
			try {
				await AuthService.refreshAccessToken();
				// Retry the original request with the new access token
				const authToken = TokenService.loadToken(TOKEN_TYPE.ACCESS);
				originalRequest.headers["Authorization"] =
					`Bearer ${authToken}`;
				return axios(originalRequest);
			} catch (refreshError) {
				// If token refresh fails, logoutuser and redirect to login page
				AuthService.userLogout();
				throw redirect("/auth?status=expired");
				// You might want to redirect the user to the login page or show a message
			}
		}

		throw error;
	}
);
