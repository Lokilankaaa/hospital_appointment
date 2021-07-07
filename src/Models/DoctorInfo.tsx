import { ClassNameMap } from "@material-ui/styles/withStyles";
export interface DoctorInfoProps {
    classes: ClassNameMap,
    name: string,
    birthday: string,
    gender: string,
    rankk: string,
    depart: string,
    info: string,
}

export interface DoctorInfoPageProps {
    classes: ClassNameMap,
    cardClasses: ClassNameMap,
    headerClasses: ClassNameMap
}

export interface getinfo {
    login_token: string;
}

export interface changeDoctorPasswordRequest {
    login_token: string,
    password_old: string,
    password_new: string
}

export interface changeDoctorInfoRequest {
    login_token: string,
    name: string,
    birthday: string,
    gender: string,
    rankk: string,
    depart: string,
    info: string
}

export interface DoctorPasswordProps {
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