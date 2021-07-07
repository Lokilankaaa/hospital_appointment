import {ClassNameMap} from "@material-ui/styles/withStyles";
export interface UserInfoProps {
    classes : ClassNameMap,
    Name: string;
    Gender: string;
    ID_Number: string;
    Birthday: string;
    PhoneNumber: string;
}

export interface UserInfoPageProps {
    classes: ClassNameMap,
    cardClasses: ClassNameMap,
    headerClasses: ClassNameMap
}

export interface getinfo {
    login_token: string;
}

export interface adminViewDoctor {
    login_token: string;
    did: string;
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

export interface adminChangeUserInfoRequest {
    login_token: string,
    username: string,
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