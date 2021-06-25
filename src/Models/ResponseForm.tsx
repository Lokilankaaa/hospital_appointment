export interface timesForm {
    "tid": number,
    "did": string,
    "start_time": string,
    "end_time": string,
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

export interface appointment {
    "did": string,
    "doctor_name": string,
    "depart":string,
    "start_time": string,
    "end_time": string,
    "status": string,
    "time": string
}