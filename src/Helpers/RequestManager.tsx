import axios from "axios";
import {userStateInfoManager} from './UserStateInfoManager';
import {appointment, search_doctor_response, timesForm} from "../Models/ResponseForm";
import {detailProps} from "../Models/DocDetail";
import avatar_g from '../Assets/per_girl.png';
import avatar_b from '../Assets/per_boy.png';
import moment from "moment";
import history from '../Helpers/History';
import {getLoginRoute} from "./Routers";
import {ClassNameMap} from "@material-ui/styles/withStyles";
import { SignUpForm, SignupResponse } from '../Models/SignUp'

import { convertSignupFormToRequest, convertFromSimpleResponse } from './LoginConverter'
import { LoginFrom, LoginResponse } from '../Models/Login'
import { convertLoginFormToRequest, convertFromLoginResponse } from './LoginConverter'
import  OperationStateManager  from "../Helpers/OperationStateManager"

import { UserPasswordProps, UserInfoProps } from '../Models/UserInfo'
import { convertUserinfoToRequest, convertToChangePasswordRequest, convertToUserInfoRequest } from './InfoConverter'

import { convertToDoctorReviewHistoryRequest, convertToDoctorReviewHistoryResonse, convertToReviewRequest } from './ReviewConverter'
import { DoctorReviewFilter, UserReview } from '../Models/ReviewHistory'

import { convertSignupFormToRequest, convertFromSignupResponse } from './LoginConverter'
import { LoginFrom, LoginResponse } from '../Models/Login'
import { convertLoginFormToRequest, convertFromLoginResponse } from './LoginConverter'


class RequestManager {
    private m_path: string = '/user/';

    constructor() {
        axios.defaults.baseURL = "http://60.205.206.96";
        axios.defaults.headers.post['Content-Type'] = "text/plain";
    }

    user_login(info: LoginFrom, status: OperationStateManager) {
        const path = this.m_path + 'login';
        status.Trigged();
        axios.post(path, convertLoginFormToRequest(info)).then((response) => {
            console.log(response.status);
            if (response.status === 200) {
                let result = convertFromLoginResponse(response.data)
                if(result.success) {
                    userStateInfoManager.UserLogin(result.login_token, info.username);
                    status.Successful();
                } else{
                    status.Failed(result.err);
                }
                
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    user_logout(callBack: any) {
        const path = this.m_path + 'logout';
        axios.post(path, {login_token: userStateInfoManager.getLoginToken()}).then((response) => {
            console.log(response.status);
            if (response.status === 200) {
                let result = convertFromLoginResponse(response.data)
                if(result.success) {
                    userStateInfoManager.UserLogout();
                    callBack();
                }
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    user_signup(info: SignUpForm, status: OperationStateManager)  {
        const path = this.m_path + 'register';
        status.Trigged();
        axios.post(path, convertSignupFormToRequest(info)).then((response) => {
            console.log(response.status);
            let result = convertFromSimpleResponse(response.data)
            if (response.status === 200) {
                if(result.success) {
                    status.Successful();
                } else{
                status.Failed(result.err);
                }
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    user_getinfo(callback: any)  {
        const path = this.m_path + 'view_info';
        axios.post(path, convertUserinfoToRequest()).then((response) => {
            console.log(response.status);
            callback(response.data)

        }).catch((e) => {
            console.log(e);
        })
    }

    user_changePassword(pass: UserPasswordProps, status: OperationStateManager)  {
        const path = this.m_path + 'modify_password';
        status.Trigged();
        axios.post(path, convertToChangePasswordRequest(pass)).then((response) => {
            console.log(response.status);
            let result = convertFromSimpleResponse(response.data)
            if (response.status === 200) {
                if(result.success) {
                    status.Successful();
                } else{
                status.Failed(result.err);
                }
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    user_changeUserInfo(info: UserInfoProps, status: OperationStateManager)  {
        const path = this.m_path + 'modify_info';
        status.Trigged();
        axios.post(path, convertToUserInfoRequest(info)).then((response) => {
            console.log(response.status);
            let result = convertFromSimpleResponse(response.data)
            if (response.status === 200) {
                if(result.success) {
                    status.Successful();
                } else{
                status.Failed(result.err);
                }
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    search_reviews(filter: DoctorReviewFilter, status: OperationStateManager, callBack: any)  {
        const path = this.m_path + 'search_comment';
        status.Trigged();
        axios.post(path, convertToDoctorReviewHistoryRequest(filter)).then((response) => {
            console.log(response.status);
            let result = convertFromSimpleResponse(response.data)
            if (response.status === 200) {
                if(result.success) {
                    let comments = convertToDoctorReviewHistoryResonse(response.data['comments'])
                    callBack(comments)
                    status.Successful();
                } else{
                status.Failed(result.err);
                }
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    post_review(review: UserReview, status: OperationStateManager)  {
        const path = this.m_path + 'comment';
        status.Trigged();
        axios.post(path, convertToReviewRequest(review)).then((response) => {
            console.log(response.status);
            let result = convertFromSimpleResponse(response.data)
            if (response.status === 200) {
                if(result.success) {
                    status.Successful();
                } else{
                    status.Failed(result.err);
                }
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    user_login(info: LoginFrom) {
        const path = this.m_path + 'login';
        axios.post(path, convertLoginFormToRequest(info)).then((response) => {
            console.log(response.status);
            if (response.status === 200) {
                let result = convertFromLoginResponse(response.data)
                if(result.success) {
                    userStateInfoManager.UserLogin(result.login_token, info.username);
                }
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    user_signup(info: SignUpForm)  {
        const path = this.m_path + 'register';
        axios.post(path, convertSignupFormToRequest(info)).then((response) => {
            console.log(response.status);
            if (response.status === 200) {
                let result = convertFromSignupResponse(response.data)
            }
        }).catch((e) => {
            console.log(e);
        })
    }


    search_depart(value: string, types: Array<string>) {
        const path = this.m_path + 'search_depart';
        axios.post(path, {
            "depart_name": value,
            "first_index": 0,
            "limit": 20,
        }).then((response) => {
            console.log(response.status);
            if (response.status === 200) {
                response.data["departments"].map((department: { name: string, info: string }) =>
                    types.push(department["name"])
                )
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    search_docs(depart_name: string, docName: string, res: Array<detailProps>, classes: ClassNameMap) {
        const path = this.m_path + 'search_doctor';
        axios.post(path, {
            "doctor_name": docName,
            "depart_name": depart_name,
            "rank": "",
            "first_index": 0,
            "limit": 20,
        }).then((response) => {
            if (response.status === 200) {
                response.data['doctors'].map((doctor: search_doctor_response) => {
                    const doctimes = new Array<timesForm>();
                    this.search_time(doctor['did'], doctimes)
                    if (doctimes.length > 0)
                        for (let i = 0; i < doctimes.length; i++)
                            res.push({
                                classes: classes,
                                tid: doctimes[i]['tid'],
                                did: doctor['did'],
                                docName: doctor["name"],
                                docTitle: doctor["rank"],
                                fee: 10,
                                docImg: doctor['gender'] === '男' ? avatar_b : avatar_g,
                                gender: doctor['gender'] === '男',
                                isam: doctimes[i]['time'] === '上午',
                                capacity: doctimes[i]['capacity'],
                                rest: doctimes[i]['rest'],
                            })

                    else
                        res.push({
                            classes: classes,
                            tid: -1,
                            did: doctor['did'],
                            docName: doctor["name"],
                            docTitle: doctor["rank"],
                            fee: 10,
                            docImg: doctor['gender'] === '男' ? avatar_b : avatar_g,
                            gender: doctor['gender'] === '男',
                            isam: true,
                            capacity: 1,
                            rest: 1,
                        })
                })
            }
        })
    }

    search_time(did: string, times: Array<timesForm>) {
        const path = this.m_path + 'search_time';
        axios.post(path, {
            'did': did,
            'date': moment().format('YYYY-MM-DD'),
            'first_index': 0,
            'limit': 20,
        }).then((response) => {
            if (response.status === 200) {
                response.data['times'].map((time: timesForm) =>
                    times.push(time)
                )
            }
        }).catch(e => {
            console.log(e);
        })
    }

    search_appointment(status: string, appointments: Array<Dictionary>) {
        if (userStateInfoManager.isLogin()) {
            const path = this.m_path + 'search_appoint';
            axios.post(path, {
                "login_token": userStateInfoManager.getLoginToken(),
                "start_time": "1970-01-01T12:13:00.000+08:00",
                "end_time": new Date().toISOString(),
                "status": status,
                "first_index": 0,
                "limit": 20
            }).then((response) => {
                let i = 0;
                response.data['appointments'].map((appointment: appointment) =>
                    appointments.push({
                        did: appointment['did'],
                        order: i++,
                        type: appointment['doctor_depart'],
                        docName: appointment['doctor_name'],
                        time: appointment['time'],
                        fee: 10,
                        status: appointment['status']
                    })
                )
            })
        } else {
            alert("请先登陆！");
            history.replace(getLoginRoute());
        }
    }

    cancel_appointment(tid: number) {
        if (userStateInfoManager.isLogin()) {
            const path = this.m_path + 'cancel_appoint';
            axios.post(path, {
                "login_token": userStateInfoManager.getLoginToken(),
                "tid": tid
            }).then((response) => {
                if (response.data['success'] === true) {
                    alert('cancellation done!');
                } else {
                    alert(response.data['err']);
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    appoint(tid: number) {
        if (userStateInfoManager.isLogin()) {
            const path = this.m_path + 'appoint';
            console.log(userStateInfoManager.getLoginToken())
            axios.post(path, {
                "login_token": userStateInfoManager.getLoginToken(),
                "tid": tid
            }).then((response) => {
                if (response.data['success'] === true) {
                    alert('appointment done!');
                } else {
                    alert(response.data['err']);
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }
}

export const requestManager = new RequestManager();