export interface SignUpForm {
    PhoneNumber: string;
    UserName: string;
    Passward: string;
    PasswardConfirm: string; 
}

export interface SignupRequest {
    username: string,
    name: string,
    password: string,
    gender: string,
    birthday: string,
    telephone: string
}

export interface SignupResponse {
    success: boolean,
    err: string,
}
