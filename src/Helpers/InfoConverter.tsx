import {UserInfoProps, InfoTypes, getinfo, changeUserInfoRequest, adminChangeUserInfoRequest} from '../Models/UserInfo'
import { DoctorInfoProps, changeDoctorInfoRequest } from '../Models/DoctorInfo'
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

export function convertUserinfoToRequest() : getinfo{
    return {
        login_token: userStateInfoManager.getLoginToken()
      }
}

export function convertDoctorinfoToRequest() : getinfo{
    return {
        login_token: doctorStateInfoManager.getLoginToken()
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
        login_token: doctorStateInfoManager.getLoginToken(),
        name: info.Name,
        birthday: info.Birthday,
        gender: info.Gender,
        info: info.Info
    }
}