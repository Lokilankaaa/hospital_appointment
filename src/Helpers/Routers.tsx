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

export function getDoctorReviewHistoryRoute(docID: string) {
    return `/review/history/${docID}`;
}