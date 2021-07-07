import { UserInfoProps, InfoTypes, getinfo, changeUserInfoRequest } from '../Models/UserInfo'
import { DoctorInfoProps, changeDoctorInfoRequest } from '../Models/DoctorInfo'
import { changePasswordRequest, UserPasswordProps } from '../Models/UserInfo'
import { changeDoctorPasswordRequest, DoctorPasswordProps } from '../Models/DoctorInfo'
import { userStateInfoManager } from './UserStateInfoManager';
import { doctorStateInfoManager } from './DoctorStateInfoManager';

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

export function convertUserinfoToResponse(): getinfo {
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

export function convertToDoctorInfoRequest(info: DoctorInfoProps): changeDoctorInfoRequest {
    return {
        login_token: doctorStateInfoManager.getLoginToken(),
        name: info.name,
        birthday: info.birthday,
        gender: info.gender,
        rankk: info.rankk,
        depart: info.depart,
        info: info.info,
    }
}