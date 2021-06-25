import axios from "axios";
import {userStateInfoManager} from './UserStateInfoManager';
import {appointment, search_doctor_response, timesForm} from "../Models/ResponseForm";
import {detailProps} from "../Models/DocDetail";
import {recordClasses} from "../Styles/madeStyles";
import avatar_g from '../Assets/per_girl.png';
import avatar_b from '../Assets/per_boy.png';


class RequestManager {
    private m_path: string = '/user/';

    constructor() {
        axios.defaults.baseURL = "http://60.205.206.96";
        axios.defaults.headers.post['Content-Type'] = "application/json";
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
                response.data["departments"].map((department: { name: string, info: string }) => {
                    types.push(department["name"]);
                })
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    search_docs(depart_name: string, docName: string, res: Array<detailProps>, depart: boolean) {
        const path = this.m_path + 'search_doctor';
        axios.post(path, {
            "depart_name": depart_name,
            "doctor_name": docName,
            "rank": "",
            "first_index": 0,
            "limit": 20,
        }).then((response) => {
            if (response.status === 200) {
                if (depart)
                    response.data.map((doctor: search_doctor_response) => {
                        const doctimes = new Array<timesForm>();
                        const start = new Date();
                        const end = new Date(start.getDate() + 24 * 60 * 60 * 1000 - 1);
                        this.search_time(doctor['did'], start, end, doctimes)
                        res.push({
                            classes: recordClasses(),
                            did: doctor['did'],
                            docName: doctor["name"],
                            docTitle: doctor["rank"],
                            fee: 10,
                            docImg: doctor['gender'] === '男' ? avatar_b : avatar_g,
                            times: doctimes,
                            gender: doctor['gender'] === '男'
                        })
                    })
            }
        })
    }

    search_time(did: string, start: Date, end: Date, times: Array<timesForm>) {
        const path = this.m_path + 'search_time';
        axios.post(path, {
            'did': did,
            'start_time': start.toISOString(),
            'end_time': end.toISOString(),
            'first_index': 0,
            'limit': 20,
        }).then((response) => {
            if (response.status === 200) {
                response.data.map((time: timesForm) => {
                    times.push(time)
                })
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
                response.data.map((appointment: appointment) => {
                    appointments.push({
                        order: i++,
                        type: appointment['depart'],
                        docName: appointment['doctor_name'],
                        time: appointment['time'],
                        fee: 10,
                        status: appointment['status']
                    })
                })
            })
        } else {
            alert("Login first please!");
        }
    }

    cancel_appointment(tid: string) {
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

    appoint(tid: string) {
        if (userStateInfoManager.isLogin()) {
            const path = this.m_path + 'appoint';
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