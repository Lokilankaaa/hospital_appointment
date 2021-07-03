import { ClassNameMap, Styles, WithStylesOptions } from '@material-ui/styles/withStyles';
export interface LoginProps {
    classes: ClassNameMap;
    identity: string;
    headerClasses: ClassNameMap;
}

export interface SignUpProps {
    classes: ClassNameMap;
    headerClasses: ClassNameMap;
}

export interface LoginFrom {
    username: string;
    password: string;
}

export interface DoctorLoginFrom {
    did: string;
    password: string;
}

export interface LoginRequest {
    username: string,
    password: string,
}

export interface DoctorLoginRequest {
    did: string,
    password: string,
}

export interface LoginResponse {
    success: boolean,
    err: string,
    login_token: string
}

export interface DoctorLoginResponse {
    success: boolean,
    err: string,
    login_token: string
}
