export interface DoctorInfo{
    docName: string,
    docImg: string,
    docTitle: string,
    docDepartment: string
}

export interface AppointmentInfo {
    Department: string,
    time: string
}

export interface Review {
    rating: string,
    doctorID: string,
    commentNum: number,
    star: number
}

export interface UserReview {
    rating: string,
    content: string,
    date: string,
    disease: string,
    delay: number,
    userName: string,
    userImg: string
}

export interface ReviewRequest {
    login_token: string,
    did: string,
    comment: string
}