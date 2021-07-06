class AdminStateInfoManager {
    private _isLogin: boolean = false;
    private aID: string = "";
    private loginToken: string = "";

    // setters
    AdminLogin(token: string, aid: string) {
        console.log(`Admin ${aid} logined with token ${token}`)
        this._isLogin = true;
        this.loginToken = token;
        this.aID = aid;
    }

    AdminLogout() {
        this._isLogin = false;
        this.aID = "";
        this.loginToken = "";
    }

    // getters
    isLogin() {
        return this._isLogin;
    }

    getLoginToken() {
        return this.loginToken;
    }

    getaID() {
        return this.aID;
    }
}

export const adminStateInfoManager = new AdminStateInfoManager();
