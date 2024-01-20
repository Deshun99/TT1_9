

export const TOKEN_TYPE = {
    ACCESS: "access_token",
    REFRESH: "refresh_token"
}
export class TokenService {
    static setToken(token, tokenType){
        if(token) localStorage.setItem(tokenType, token)
        else throw new Error("Token is undefined/null")
    }
    static loadToken(tokenType){
        return localStorage.getItem(tokenType)
    }
    static removeToken(tokenType){
        localStorage.removeItem(tokenType)
    }
}