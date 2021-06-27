export interface UserInfoProps {
    Name: string;
    Gender: string;
    ID: string;
    IDValidDateFrom: string;
    IDValidDateTo: string;
    Nationality: string;
    PhoneNumber: string;
    Passsword: string
}

export interface getinfo {
    login_token: string;
}

export interface changePasswordRequest {
    login_token: string,
    password_old: string,
    password_new: string
  }

export interface changeUserInfoRequest {
    login_token: string,
    name: string,
    gender: string,
    birthday: string,
    id_number: string,
    telephone: string
}

export interface UserPasswordProps {
    OldPassword: string;
    NewPassword: string;
    ConfoirmPassword: string;
}

export enum InfoTypes {
    Info,
    ChangePassword,
    Patients,
    Appointments,
    Focus
}