class UserStateInfoManager {
    private _isLogin: boolean = false;
    private userName: string = "";
    private loginToken: string = "";

    // setters
    UserLogin(token: string, name: string) {
        console.log(`User ${name} logined with token ${token}`)
        this._isLogin = true;
        this.loginToken = token;
        this.userName = name;
    }

    UserLogout() {
        this._isLogin = false;
        this.loginToken = "";
        this.userName = "";
    }
    // getters
    isLogin() {
        return this._isLogin;
    }

    getLoginToken() {
        return this.loginToken;
    }

    getUserName() {
        return this.userName;
    }

}

export const userStateInfoManager = new UserStateInfoManager();
