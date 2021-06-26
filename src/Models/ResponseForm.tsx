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

export interface appointment {
    "did": string,
    "doctor_name": string,
    "doctor_depart":string,
    "start_time": string,
    "end_time": string,
    "status": string,
    "time": string
}