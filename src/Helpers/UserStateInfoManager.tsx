class UserStateInfoManager {
    private _isLogin: boolean = false;
    private userName: string = "";
    private loginToken: string = "";

    isLogin() {
        return this._isLogin;
    }

    setIsLogin(value: boolean) {
        this._isLogin = value;
    }

    setLoginToken(value: string) {
        this._isLogin = true;
        this.loginToken = value;
    }

    getLoginToken() {
        return this._isLogin;
    }

    setUserName(value: string) {
        this.userName = value;
    }

    getUserName() {
        return this.userName;
    }

}

export const userStateInfoManager = new UserStateInfoManager();
