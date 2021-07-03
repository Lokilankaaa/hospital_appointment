import { SignUpForm, SignupResponse, SignupRequest } from '../Models/SignUp'
import { LoginFrom, LoginResponse, LoginRequest, DoctorLoginFrom, DoctorLoginResponse, DoctorLoginRequest } from '../Models/Login'

export function convertSignupFormToRequest(info: SignUpForm) : SignupRequest{
    return {
        username: info.UserName,
        name: info.UserName,
        password: info.Passward,
        gender: "男",
        birthday: "1970-01-01",
        telephone: info.PhoneNumber
      }
}

export function convertFromSimpleResponse(data: any) : SignupResponse{
    return {
        success: data["success"],
        err: data["err"],
      }
}

export function convertLoginFormToRequest(info: LoginFrom) : LoginRequest{
    return {
        username: info.username,
        password: info.password,
      }
}

export function convertDoctorLoginFormToRequest(info: DoctorLoginFrom) : DoctorLoginRequest{
  return {
      did: info.did,
      password: info.password,
    }
}

export function convertFromLoginResponse(data: any) : LoginResponse{
    return {
        success: data["success"],
        err: data["err"],
        login_token: data["login_token"],
      }
}

export function convertFromDoctorLoginResponse(data: any) : DoctorLoginResponse{
  return {
      success: data["success"],
      err: data["err"],
      login_token: data["login_token"],
    }
}
