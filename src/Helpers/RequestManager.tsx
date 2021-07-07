import axios from "axios";
import { userStateInfoManager } from './UserStateInfoManager';
import { doctorStateInfoManager } from './DoctorStateInfoManager';
import { adminStateInfoManager } from "./AdminStateInfoManager";
import {
    appointment,
    search_doctor_response,
    timesForm,
    appointmentForDoctor,
    search_user_response
} from "../Models/ResponseForm";
import { detailProps } from "../Models/DocDetail";
import avatar_g from '../Assets/per_girl.png';
import avatar_b from '../Assets/per_boy.png';
import moment from "moment";
import history from '../Helpers/History';
import {
    getLoginRoute,
    getDoctorLoginRoute,
    getAdminRoute,
    getAdminLoginRoute,
    getDoctorReviewHistoryRoute
} from "./Routers";
import { ClassNameMap } from "@material-ui/styles/withStyles";
import { SignUpForm, SignupResponse } from '../Models/SignUp'

import {
    convertSignupFormToRequest,
    convertFromSimpleResponse,
    convertAdminLoginFromToRequest,
    convertFromAdminLoginResponse
} from './LoginConverter'
import { LoginFrom, LoginResponse, DoctorLoginFrom, DoctorLoginResponse, AdminLoginFrom, AdminLoginResponse } from '../Models/Login'
import { convertLoginFormToRequest, convertFromLoginResponse, convertDoctorLoginFormToRequest, convertFromDoctorLoginResponse } from './LoginConverter'
import OperationStateManager from "../Helpers/OperationStateManager"

import { UserPasswordProps, UserInfoProps } from '../Models/UserInfo'
import { DoctorPasswordProps, DoctorInfoProps } from '../Models/DoctorInfo'
import {
    convertUserinfoToRequest,
    convertToChangePasswordRequest,
    convertToUserInfoRequest,
    convertDoctorinfoToRequest,
    convertToDoctorChangePasswordRequest,
    convertToDoctorInfoRequest,
    convertAdminModifyToRequest, convertToAdminToUserInfoRequest, convertAdminViewDoctorRequest
} from './InfoConverter'
import { convertAppointmentToRequest } from './InfoConverter'

import { convertToDoctorReviewHistoryRequest, convertToDoctorReviewHistoryResonse, convertToReviewRequest, convertToDoctorSearchCommentRequest } from './ReviewConverter'
import { DoctorReviewFilter, UserReview, DoctorSearchCommentRequest } from '../Models/ReviewHistory'


class RequestManager {
    private m_path: string = '/user/';
    private d_path: string = '/doctor/';
    private a_path: string = '/admin/'

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
                if (result.success) {
                    userStateInfoManager.UserLogin(result.login_token, info.username);
                    status.Successful();
                } else {
                    status.Failed(result.err);
                }

            }
        }).catch((e) => {
            console.log(e);
        })
    }

    doctor_login(info: DoctorLoginFrom, status: OperationStateManager) {
        const path = this.d_path + 'login';
        status.Trigged();
        axios.post(path, convertDoctorLoginFormToRequest(info)).then((response) => {
            console.log(response.status);
            if (response.status === 200) {
                let result = convertFromDoctorLoginResponse(response.data)
                if (result.success) {
                    doctorStateInfoManager.DoctorLogin(result.login_token, info.did);
                    status.Successful();
                } else {
                    status.Failed(result.err);
                }

            }
        }).catch((e) => {
            console.log(e);
        })
    }

    admin_login(info: AdminLoginFrom, status: OperationStateManager) {
        const path = this.a_path + 'login';
        status.Trigged();
        axios.post(path, convertAdminLoginFromToRequest(info)).then((response) => {
            console.log(response.status);
            if (response.status === 200) {
                let result = convertFromAdminLoginResponse(response.data)
                if (result.success) {
                    adminStateInfoManager.AdminLogin(result.login_token, info.aid);
                    status.Successful();
                    history.push(getAdminRoute())
                } else {
                    status.Failed(result.err);
                }
            }
        }).catch((e) => {
            console.log(e);
        })
    }


    user_logout(callBack: any) {
        const path = this.m_path + 'logout';
        axios.post(path, { login_token: userStateInfoManager.getLoginToken() }).then((response) => {
            console.log(response.status);
            if (response.status === 200) {
                let result = convertFromLoginResponse(response.data)
                if (result.success) {
                    userStateInfoManager.UserLogout();
                    callBack();
                }
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    doctor_logout(callBack: any) {
        const path = this.d_path + 'logout';
        axios.post(path, { login_token: doctorStateInfoManager.getLoginToken() }).then((response) => {
            console.log(response.status);
            if (response.status === 200) {
                let result = convertFromDoctorLoginResponse(response.data)
                if (result.success) {
                    doctorStateInfoManager.DoctorLogout();
                    callBack();
                }
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    admin_logout(callBack: any) {
        const path = this.a_path + 'logout';
        axios.post(path, { login_token: adminStateInfoManager.getLoginToken() }).then((response) => {
            console.log(response.status);
            if (response.status === 200) {
                let result = convertFromAdminLoginResponse(response.data)
                if (result.success) {
                    adminStateInfoManager.AdminLogout();
                    callBack();
                }
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    user_signup(info: SignUpForm, status: OperationStateManager) {
        const path = this.m_path + 'register';
        status.Trigged();
        axios.post(path, convertSignupFormToRequest(info)).then((response) => {
            console.log(response.status);
            let result = convertFromSimpleResponse(response.data)
            if (response.status === 200) {
                if (result.success) {
                    status.Successful();
                } else {
                    status.Failed(result.err);
                }
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    user_getinfo(callback: any) {
        console.log('userState :', adminStateInfoManager.getToModify())
        if (adminStateInfoManager.getToModify() === "") {
            const path = this.m_path + 'view_info';
            axios.post(path, convertUserinfoToRequest()).then((response) => {
                console.log(response.status);
                callback(response.data)

            }).catch((e) => {
                console.log(e);
            })
        } else {
            console.log('modify_user !')
            const path = this.a_path + 'view_user';
            axios.post(path, convertAdminModifyToRequest()).then((response) => {
                console.log(response.status);
                callback(response.data)

            }).catch((e) => {
                console.log(e);
            })
        }
    }

    doctor_getinfo(callback: any) {
        if (adminStateInfoManager.isLogin()) {
            const path = this.a_path + 'view_doctor';
            axios.post(path, convertAdminViewDoctorRequest()).then((response) => {
                console.log(response.status);
                callback(response.data)

            }).catch((e) => {
                console.log(e);
            })
        }
        else {
            const path = this.d_path + 'view_info';
            axios.post(path, convertDoctorinfoToRequest()).then((response) => {
                console.log(response.status);
                callback(response.data)

            }).catch((e) => {
                console.log(e);
            })
        }
    }

    appointment_getinfo(callback: any) {
        const path = this.d_path + 'search_appoint';
        axios.post(path, convertAppointmentToRequest()).then((response) => {
            console.log(response.status);
            callback(response.data)

        }).catch((e) => {
            console.log(e);
        })
    }

    user_changePassword(pass: UserPasswordProps, status: OperationStateManager) {
        const path = this.m_path + 'modify_password';
        status.Trigged();
        axios.post(path, convertToChangePasswordRequest(pass)).then((response) => {
            console.log(response.status);
            let result = convertFromSimpleResponse(response.data)
            if (response.status === 200) {
                if (result.success) {
                    status.Successful();
                } else {
                    status.Failed(result.err);
                }
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    doctor_changePassword(pass: DoctorPasswordProps, status: OperationStateManager) {
        const path = this.d_path + 'modify_password';
        status.Trigged();
        axios.post(path, convertToDoctorChangePasswordRequest(pass)).then((response) => {
            console.log(response.status);
            let result = convertFromSimpleResponse(response.data)
            if (response.status === 200) {
                if (result.success) {
                    status.Successful();
                } else {
                    status.Failed(result.err);
                }
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    user_changeUserInfo(info: UserInfoProps, status: OperationStateManager) {
        if (adminStateInfoManager.getToModify() == "") {
            const path = this.m_path + 'modify_info';
            status.Trigged();
            axios.post(path, convertToUserInfoRequest(info)).then((response) => {
                console.log(response.status);
                let result = convertFromSimpleResponse(response.data)
                if (response.status === 200) {
                    if (result.success) {
                        status.Successful();
                    } else {
                        status.Failed(result.err);
                    }
                }
            }).catch((e) => {
                console.log(e);
            })
        } else {
            const path = this.a_path + 'modify_user';
            status.Trigged();
            axios.post(path, convertToAdminToUserInfoRequest(info)).then((response) => {
                console.log(response.status);
                let result = convertFromSimpleResponse(response.data)
                if (response.status === 200) {
                    if (result.success) {
                        status.Successful();
                    } else {
                        status.Failed(result.err);
                    }
                }
            }).catch((e) => {
                console.log(e);
            })
        }
    }

    doctor_changeDoctorInfo(info: DoctorInfoProps, status: OperationStateManager) {
        if (adminStateInfoManager.isLogin()) {
            const path = this.a_path + 'modify_doctor';
            status.Trigged();
            axios.post(path, convertToDoctorInfoRequest(info)).then((response) => {
                console.log(response.status);
                let result = convertFromSimpleResponse(response.data)
                if (response.status === 200) {
                    if (result.success) {
                        status.Successful();
                    } else {
                        status.Failed(result.err);
                    }
                }
            }).catch((e) => {
                console.log(e);
            })
        } else {
            const path = this.d_path + 'modify_info';
            status.Trigged();
            axios.post(path, convertToDoctorInfoRequest(info)).then((response) => {
                console.log(response.status);
                let result = convertFromSimpleResponse(response.data)
                if (response.status === 200) {
                    if (result.success) {
                        status.Successful();
                    } else {
                        status.Failed(result.err);
                    }
                }
            }).catch((e) => {
                console.log(e);
            })
        }
    }

    // TODO: doctor add, modify, delete, search time
    // TODO: discuss date and response
    doctor_addTime(time: string, status: OperationStateManager) {
        const path = this.d_path + 'add_time';
        axios.post(path, {
            'login_token': doctorStateInfoManager.getLoginToken(),
            'date': moment().format('YYYY-MM-DD'),
            'time': time,
            'capacity': 1,
        }).then((response) => {
            let result = convertFromSimpleResponse(response.data)
            if (response.status === 200) {
                if (result.success) {
                    status.Successful();
                } else {
                    status.Failed(result.err);
                }
            }
        }).catch(e => {
            console.log(e);
        })
    }

    doctor_modifyTime(tid: number, capacity: number, status: OperationStateManager) {
        const path = this.d_path + 'modify_time';
        axios.post(path, {
            'login_token': doctorStateInfoManager.getLoginToken(),
            'tid': tid,
            'capacity': capacity,
        }).then((response) => {
            let result = convertFromSimpleResponse(response.data)
            if (response.status === 200) {
                if (result.success) {
                    status.Successful();
                } else {
                    status.Failed(result.err);
                }
            }
        }).catch(e => {
            console.log(e);
        })
    }

    doctor_deleteTime(tid: number, status: OperationStateManager) {
        const path = this.d_path + 'delete_time';
        axios.post(path, {
            'login_token': doctorStateInfoManager.getLoginToken(),
            'tid': tid
        }).then((response) => {
            let result = convertFromSimpleResponse(response.data)
            if (response.status === 200) {
                if (result.success) {
                    status.Successful();
                } else {
                    status.Failed(result.err);
                }
            }
        }).catch(e => {
            console.log(e);
        })
    }

    doctor_searchTime(times: Array<timesForm>) {
        const path = this.d_path + 'search_time';
        axios.post(path, {
            'login_token': doctorStateInfoManager.getLoginToken(),
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

    search_reviews(filter: DoctorReviewFilter, status: OperationStateManager, callBack: any) {
        const path = this.m_path + 'search_comment';
        status.Trigged();
        axios.post(path, convertToDoctorReviewHistoryRequest(filter)).then((response) => {
            console.log(response.status);
            let result = convertFromSimpleResponse(response.data)
            if (response.status === 200) {
                if (result.success) {
                    let comments = convertToDoctorReviewHistoryResonse(response.data['comments'])
                    callBack(comments)
                    status.Successful();
                } else {
                    status.Failed(result.err);
                }
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    // TODO: may build independent convertToDoctorReviewHistoryResonse
    doctor_searchComment(status: OperationStateManager, callBack: any) {
        const path = this.d_path + 'search_comment';
        status.Trigged();
        axios.post(path, convertToDoctorSearchCommentRequest()).then((response) => {
            console.log(response.status);
            let result = convertFromSimpleResponse(response.data)
            if (response.status === 200) {
                if (result.success) {
                    let comments = convertToDoctorReviewHistoryResonse(response.data['comments'])
                    callBack(comments)
                    status.Successful();
                }
                else {
                    status.Failed(result.err);
                }
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    post_review(review: UserReview, status: OperationStateManager) {
        const path = this.m_path + 'comment';
        status.Trigged();
        axios.post(path, convertToReviewRequest(review)).then((response) => {
            console.log(response.status);
            let result = convertFromSimpleResponse(response.data)
            if (response.status === 200) {
                if (result.success) {
                    status.Successful();
                } else {
                    status.Failed(result.err);
                }
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

    search_users(userName: string, res: Array<UserInfoProps>, classes: ClassNameMap) {
        const path = this.a_path + 'search_user';
        if (userName == "") {
            axios.post(path, {}).then((response) => {
                if (response.status === 200) {
                    response.data['users'].map((user: search_user_response) => {
                        res.push({
                            classes: classes,
                            Name: user.name,
                            Gender: user.gender,
                            Birthday: user.age.toString(),
                            ID_Number: "",
                            PhoneNumber: user.telephone,
                        })
                    })
                }
            }
            )
        } else {
            axios.post(path, {
                "username": userName
            }).then((response) => {
                if (response.status === 200) {
                    response.data['users'].map((user: search_user_response) => {
                        res.push({
                            classes: classes,
                            Name: user.name,
                            Gender: user.gender,
                            Birthday: "",
                            ID_Number: "",
                            PhoneNumber: user.telephone,
                        })
                    })
                }
            })
        }
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

    // TODO: did or docName
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

    // TODO: discuss date and time
    doctor_searchAppointment(status: string, appointments: Array<Dictionary>) {
        if (doctorStateInfoManager.isLogin()) {
            const path = this.m_path + 'search_appoint';
            axios.post(path, {
                "login_token": doctorStateInfoManager.getLoginToken(),
                "start_time": "1970-01-01T12:13:00.000+08:00",
                "end_time": new Date().toISOString(),
                "status": status,
                "first_index": 0,
                "limit": 20
            }).then((response) => {
                let i = 0;
                response.data['appointments'].map((appointment: appointmentForDoctor) =>
                    appointments.push({
                        userName: appointment['username'],
                        name: appointment['name'],
                        gender: appointment['gender'],
                        age: appointment['age'],
                        tid: appointment['tid'],
                        date: appointment['date'],
                        time: appointment['time'],
                        status: appointment['status'],
                        appoTime: appointment['appo_time']
                    })
                )
            })
        }
        else {
            alert("请先登陆！");
            history.replace(getDoctorLoginRoute());
        }
    }

    admin_search_appointment(status: string, appointments: Array<Dictionary>) {
        if (adminStateInfoManager.isLogin()) {
            const path = this.a_path + 'search_appoint';
            axios.post(path, {
                "login_token": adminStateInfoManager.getLoginToken(),
                "start_time": "1970-01-01T12:13:00.000+08:00",
                "end_time": new Date().toISOString(),
                "status": status,
                "first_index": 0,
                "limit": 20
            }).then((response) => {
                let i = 0;
                response.data['appointments'].map((appointment: appointment) =>
                    appointments.push({
                        aid: appointment['did'],
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
            history.replace(getAdminLoginRoute());
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

    admin_cancel_appointment(tid: number) {
        if (adminStateInfoManager.isLogin()) {
            const path = this.a_path + 'cancel_appoint';
            axios.post(path, {
                "login_token": adminStateInfoManager.getLoginToken(),
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

    admin_remove_comments(cid: number) {
        if (adminStateInfoManager.isLogin()) {
            const path = this.a_path + 'delete_comment';
            axios.post(path, {
                "login_token": adminStateInfoManager.getLoginToken(),
                "cid": cid,
            }).then((response) => {
                if (response.status === 200) {
                    if (response.data['success'] === true) {
                        alert('Successfully deleted');
                    } else {
                        alert(response.data['err']);
                    }

                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    // TODO: username needed?
    doctor_finishAppointment(tid: number, username: string) {
        if (doctorStateInfoManager.isLogin()) {
            const path = this.d_path + 'finish_appoint';
            axios.post(path, {
                "login_token": doctorStateInfoManager.getLoginToken(),
                "username": username,
                "tid": tid
            }).then((response) => {
                if (response.data['success'] === true) {
                    alert('finished!');
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