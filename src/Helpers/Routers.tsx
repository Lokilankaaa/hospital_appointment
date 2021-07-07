export function getLoginRoute() {
    return `/login`;
}

export function getSignUpRoute() {
    return `/signup`;
}

export function getAdminRoute(){
    return `/admin`;
}

export function getDocDetail() {
    return '/register';
}

export function getLookup() {
    return '/lookup';
}

export function getUserInfoRoute() {
    return `/user`;

}

export function getAppointmentReviewRoute() {
    return `/review`;
}

export function getAdminLoginRoute(){
    return `/admin/login`
}

export function getAdminUserInfoFrontRoute() {
    return `/admin/userInfoFront`
}

export function getAdminDoctorInfoRoute() {
    return `/admin/doctorInfo`
}

export function getAdminUserInfoRoute() {
    return `/admin/userInfo`
}

export function getAdminRecordsRoute() {
    return '/admin/records'
}

export function getAdminFeedbacksRoute() {
    return '/admin/feedbacks'
}

export function getAdminToModifyTheDoctorInfo(docID: string) {
    return `/admin/doctor/${docID}/info/modify;`
}

export function getDoctorReviewHistoryRoute(docID: string) {
    return `/review/history/${docID}`;
}

export function getDoctorLoginRoute() {
    return `/doctor/login`;
}

export function getDoctorFrontPageRoute(){
    return `/doctor`;
}

export function getDoctorTimeRoute(){
    return `/doctor/time`;
}

export function getDoctorAppointmentRoute(){
    return `/doctor/appo`;
}

export function getDoctorInfoRoute(){
    return `/doctor/info`;
}

export function getDoctorAdminModifyDocInfoRoute(){
    return `/admin/doctor/info`
}
