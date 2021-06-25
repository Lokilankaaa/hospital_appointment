import axios from "axios";

class RequestManager {
    constructor() {
        axios.defaults.baseURL = "60.205.206.96";
        axios.defaults.headers.post['Content-Type'] = "application/json";
    }


}

export const requestManager = new RequestManager();