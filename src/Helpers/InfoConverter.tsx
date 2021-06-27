import { UserInfoProps, InfoTypes, getinfo, changeUserInfoRequest } from '../Models/UserInfo'
import { changePasswordRequest, UserPasswordProps } from '../Models/UserInfo' 
import {userStateInfoManager} from './UserStateInfoManager'; 

export function convertUserinfoToRequest() : getinfo{
    return {
        login_token: userStateInfoManager.getLoginToken()
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