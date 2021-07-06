class AdminStateInfoManager {
    private _isLogin: boolean = false;
    private aID: string = "";
    private loginToken: string = "";
    private toModify: string = "";

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

    AdminModifyUser(userName: string) {
        this.toModify = userName;
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

    getToModify() {
        return this.toModify;
    }
}

export const adminStateInfoManager = new AdminStateInfoManager();
