import { ClassNameMap } from "@material-ui/styles/withStyles";
export interface DoctorInfoProps {
    classes : ClassNameMap,
    Name: string;
    Gender: string;
    DID_Number: string;
    Birthday: string;
    Info: string;
    Depart: string;
    Rank: string;
}

export interface AppointmentProps {
    name: string,
    submitTime: string,
    appointTime: string,
    status: string,
}

export interface DoctorInfoPageProps {
    classes: ClassNameMap,
    cardClasses: ClassNameMap,
    headerClasses: ClassNameMap
}

export interface getappoinfo {
    login_token: string;
    start_time: string;
    end_time: string;
    status: string;
    first_index: number;
    limit: number;
}

export interface changeDoctorPasswordRequest {
    login_token: string,
    password_old: string,
    password_new: string
}

export interface changeDoctorInfoRequest {
    login_token: string,
    did: string,
    name: string,
    birthday: string,
    gender: string,
    rank: string,
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