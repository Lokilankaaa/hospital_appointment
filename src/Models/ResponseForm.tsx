export interface timesForm {
    "tid": number,
    "date": string,
    "time": string,
    "did": string,
    "doctor_name": string,
    "depart_name": string,
    "capacity": number,
    "rest": number
}

export interface search_doctor_response {
    "did": string,
    "name": string,
    "age": number,
    "gender": string,
    "rank": string,
    "depart": string,
    "info": string
}

export interface search_user_response {
    "username": string,
    "name": string,
    "age": number,
    "gender": string,
    "telephone": string,
    "is_banned": boolean,
}

export interface appointment {
    "did": string,
    "doctor_name": string,
    "doctor_depart":string,
    "start_time": string,
    "end_time": string,
    "status": string,
    "time": string,
    "tid": number,
}

export interface appointmentForDoctor {
    "username": string,
    "name": string,
    "gender": string,
    "age": number,
    "tid": number,
    "date": string,
    "time": string,
    "status": string,
    "appo_time": string
}