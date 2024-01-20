

export const TOKEN_TYPE = {
  ACCESS: "access_token",
  REFRESH: "refresh_token",
  USER_ID: "user_id",
};
export class TokenService {
  static setToken(tokenType, token) {
    if (token) localStorage.setItem(tokenType, token);
    else throw new Error("Token is undefined/null");
  }
  static loadToken(tokenType) {
    return localStorage.getItem(tokenType);
  }
  static removeToken(tokenType) {
    localStorage.removeItem(tokenType);
  }
}