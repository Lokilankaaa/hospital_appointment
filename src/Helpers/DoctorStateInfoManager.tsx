class DoctorStateInfoManager {
    private _isLogin: boolean = false;
    private dID: string = "";
    private loginToken: string = "";

    // setters
    DoctorLogin(token: string, did: string) {
        console.log(`Doctor ${did} logined with token ${token}`)
        this._isLogin = true;
        this.loginToken = token;
        this.dID = did;
    }

    DoctorLogout() {
        this._isLogin = false;
        this.dID = "";
        this.loginToken = "";
    }

    // getters
    isLogin() {
        return this._isLogin;
    }

    getLoginToken() {
        return this.loginToken;
    }

    getdID() {
        return this.dID;
    }
}

export const doctorStateInfoManager = new DoctorStateInfoManager();
