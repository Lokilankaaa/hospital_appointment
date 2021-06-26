import { ClassNameMap, Styles, WithStylesOptions } from '@material-ui/styles/withStyles';
export interface LoginProps {
    classes: ClassNameMap;
    identity: string;
}

export interface SignUpProps {
    classes: ClassNameMap;
}

export interface LoginFrom {
    username: string;
    password: string;
}

export interface LoginRequest {
    username: string,
    password: string,
}

export interface LoginResponse {
    success: boolean,
    err: string,
    login_token: string
}
