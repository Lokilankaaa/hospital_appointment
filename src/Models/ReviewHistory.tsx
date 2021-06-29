export interface DoctorInfo{
    docName: string,
    docImg: string,
    docTitle: string,
}

export interface AppointmentInfo {
    Department: string,
    time: string
}

export interface DoctorReviewFilter {
    docID: string
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

export interface DoctorReviewHistoryRequest {
    did: string,
    start_time: string,
    end_time: string,
    first_index: number,
    limit: number
  }
