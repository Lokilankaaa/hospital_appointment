import {
    UserInfoProps,
    InfoTypes,
    getinfo,
    changeUserInfoRequest,
    adminChangeUserInfoRequest,
    adminViewDoctor
} from '../Models/UserInfo'
import { DoctorInfoProps, changeDoctorInfoRequest, getappoinfo } from '../Models/DoctorInfo'
import { changePasswordRequest, UserPasswordProps } from '../Models/UserInfo' 
import { changeDoctorPasswordRequest, DoctorPasswordProps } from '../Models/DoctorInfo' 
import {userStateInfoManager} from './UserStateInfoManager'; 
import {doctorStateInfoManager} from './DoctorStateInfoManager';
import {adminStateInfoManager} from "./AdminStateInfoManager";

export function convertAdminModifyToRequest() : { login_token: string; username: string }{
    return {
        login_token: adminStateInfoManager.getLoginToken(),
        username: adminStateInfoManager.getToModify()
    }
}

export function convertUserinfoToRequest(): getinfo {
    return {
        login_token: userStateInfoManager.getLoginToken()
    }
}

export function convertDoctorinfoToRequest(): getinfo {
    return {
        login_token: doctorStateInfoManager.getLoginToken()

      }
}

export function convertAdminViewDoctorRequest(): adminViewDoctor{
    return {
        login_token: adminStateInfoManager.getLoginToken(),
        did: adminStateInfoManager.getToModify()
    }
}

export function convertAppointmentToRequest(): getappoinfo {
    return {
        login_token: doctorStateInfoManager.getLoginToken(),
        start_time: "0000-00-00T00:00:00.000Z",
        end_time: "9999-12-31T23:59:59.999Z",
        status: "",
        first_index: 0,
        limit: 100,
    }
}

export function convertUserinfoToResponse() : getinfo{
    return {
        login_token: userStateInfoManager.getLoginToken()
    }
}

export function convertToChangePasswordRequest(pass: UserPasswordProps): changePasswordRequest {
    return {
        login_token: userStateInfoManager.getLoginToken(),
        password_new: pass.NewPassword,
        password_old: pass.OldPassword
    }
}

export function convertToDoctorChangePasswordRequest(pass: DoctorPasswordProps): changeDoctorPasswordRequest {
    return {
        login_token: doctorStateInfoManager.getLoginToken(),
        password_new: pass.NewPassword,
        password_old: pass.OldPassword
    }
}

export function convertToUserInfoRequest(info: UserInfoProps): changeUserInfoRequest {
    return {
        login_token: userStateInfoManager.getLoginToken(),
        name: info.Name,
        gender: info.Gender,
        birthday: info.Birthday,
        id_number: info.ID_Number,
        telephone: info.PhoneNumber
    }
}

export function convertToAdminToUserInfoRequest(info: UserInfoProps): adminChangeUserInfoRequest {
    return {
        login_token: adminStateInfoManager.getLoginToken(),
        username: adminStateInfoManager.getToModify(),
        name: info.Name,
        gender: info.Gender,
        birthday: info.Birthday,
        id_number: info.ID_Number,
        telephone: info.PhoneNumber
    }
}

export function convertToDoctorInfoRequest(info: DoctorInfoProps): changeDoctorInfoRequest {
    return {
        did: info.DID_Number,
        login_token: adminStateInfoManager.getLoginToken(),
        name: info.Name,
        birthday: info.Birthday,
        gender: info.Gender,
        rank: info.Rank,
        depart: info.Depart,
        info: info.Info
    }
}