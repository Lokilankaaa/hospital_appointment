import './App.css';
import Login from './Components/login'
import SignUp from './Components/SignUp'
import UserInfo from './Components/UserInfo'
import UserFrontPage from './Components/UserFrontPage'
import AdminFrontPage from './Components/AdminFrontPage'
import AdminLogin from './Components/AdminLogin'
import AdminUserInfoFrontPage from './Components/AdminUserInfoFrontPage';
import AdminDoctorListPage from './Components/AdminDoctorListPage';
import AdminUserListPage from "./Components/AdminUserListPage";
import DocDetails from './Components/DoctorDetails'
import AppointmentReview from './Components/AppointmentReview'
import DoctorReviewHistory from './Components/DoctorReviewHistory'
import DoctorLogin from './Components/DoctorLogin'
import DoctorFrontPage from './Components/DoctorFrontPage'
import DoctorTime from './Components/DoctorTime'
import DoctorAppointment from './Components/DoctorAppointment'
import DoctorInfo from './Components/DoctorInfo'


import { loginClasses, FrontStyles, detailPageClasses, cardClasses, headerClasses, recordClasses, recordsClasses, UserInfoStyles, AppointmentReviewStyles, DoctorReviewHistoryStyles, DoctorInfoStyles } from "./Styles/madeStyles";
import { Route, RouteComponentProps, Switch, withRouter, Router } from 'react-router-dom';
import {
    getLoginRoute,
    getSignUpRoute,
    getDocDetail,
    getLookup,
    getUserInfoRoute,
    getAdminRoute,
    getAppointmentReviewRoute,
    getDoctorReviewHistoryRoute,
    getAdminLoginRoute,
    getAdminUserInfoFrontRoute,
    getAdminDoctorInfoRoute,
    getAdminUserInfoRoute,
    getAdminRecordsRoute,
    getAdminFeedbacksRoute,
    getDoctorLoginRoute,
    getDoctorFrontPageRoute,
    getDoctorTimeRoute,
    getDoctorAppointmentRoute,
    getDoctorInfoRoute,
    getAdminToModifyTheDoctorInfo
} from "./Helpers/Routers";
import { Provider, observer } from "mobx-react";

import history from './Helpers/History';
import RecordPage from "./Components/registeryRecords";
import AdminRecordsPage from "./Components/AdminRecordsPage";
import AdminFeedbacksPage from "./Components/AdminFeedbacksPage";
import DoctorInfoForAdminToModify from "./Components/AdminToModifyTheDoctorInfo";

// page navigation https://rookiecoder.medium.com/react-button-click-navigate-to-new-page-6af7397ea220
function App() {
    return (
        <Router history={history}>
            <Switch>
                // add your component and URl in here
                <Route exact path={getLoginRoute()} component={fnLogin} />
                <Route exact path={"/"} component={fnUserFrontPage} />
                <Route exact path={getSignUpRoute()} component={fnSignUp} />
                <Route exact path={getDocDetail()} component={fnDocDetail} />
                <Route exact path={getLookup()} component={fnLookup} />
                <Route exact path={getUserInfoRoute()} component={fnUserInfoPage} />
                <Route exact path={getAdminRoute()} component={fnAdminFrontPage} />
                <Route exact path={getAdminLoginRoute()} component={fnAdminLogin} />
                <Route exact path={getAdminUserInfoFrontRoute()} component={fnAdminUserInfoFrontPage} />
                <Route exact path={getAdminDoctorInfoRoute()} component={fnAdminDoctorInfo} />
                <Route exact path={getAdminUserInfoRoute()} component={fnAdminUserInfo} />
                <Route exact path={getAdminRecordsRoute()} component={fnAdminRecords} />
                <Route exact path={getAdminFeedbacksRoute()} component={fnAdminFeedback} />
                <Route exact path={getAppointmentReviewRoute()} component={fnAdminAppointmentReview} />
                <Route exact path={getAdminToModifyTheDoctorInfo(`:docID`)} component={fnAdminToModifyTheDoctorInfo}/>
                <Route exact path={getDoctorReviewHistoryRoute(`:docID`)} component={fnDoctorReviewHistory} />
                <Route exact path={getDoctorLoginRoute()} component={fnDoctorLogin} />
                <Route exact path={getDoctorFrontPageRoute()} component={fnDoctorFrontPage} />
                <Route exact path={getDoctorTimeRoute()} component={fnDoctorTime} />
                <Route exact path={getDoctorAppointmentRoute()} component={fnDoctorAppointment} />
                <Route exact path={getDoctorInfoRoute()} component={fnDoctorInfo} />
            </Switch>
        </Router>
    );
}

// warp to pass argument
function fnLogin() {
    return (
        <Login classes={loginClasses()} identity={"Admin"} headerClasses={headerClasses()}></Login>
    )
}

function fnSignUp() {
    return (
        <SignUp classes={loginClasses()} headerClasses={headerClasses()}></SignUp>
    )
}

function fnUserFrontPage() {
    return (
        <UserFrontPage classes={FrontStyles()} headerClasses={headerClasses()}></UserFrontPage>
    )
}

function fnDocDetail() {
    return (
        <DocDetails classes={detailPageClasses()} cardClasses={cardClasses()} headerClasses={headerClasses()} />
    )
}

function fnLookup() {
    return (
        <RecordPage classes={recordsClasses()} recordClasses={recordClasses()} headerClasses={headerClasses()} />
    )
}

function fnUserInfoPage() {
    return (
        <UserInfo classes={UserInfoStyles()} headerClasses={headerClasses()}></UserInfo>
    )
}


function fnAdminLogin(){
    return(
        <AdminLogin classes={loginClasses()} identity={"Admin"} headerClasses = {headerClasses()}></AdminLogin>
    )
}

function fnAdminFrontPage() {
    return (
        <AdminFrontPage classes={FrontStyles()} headerClasses={headerClasses()}></AdminFrontPage>
    )
}

function fnAdminUserInfoFrontPage() {
    return (
        <AdminUserInfoFrontPage classes={FrontStyles()} headerClasses={headerClasses()}></AdminUserInfoFrontPage>
    )
}

function fnAdminDoctorInfo() {
    return (
        <AdminDoctorListPage classes={detailPageClasses()} cardClasses={cardClasses()} headerClasses={headerClasses()} />
    )
}

function fnAdminUserInfo() {
    return (
        <AdminUserListPage classes={detailPageClasses()} cardClasses={cardClasses()} headerClasses={headerClasses()} />
    )
}

function fnAdminRecords() {
    return (
        <AdminRecordsPage classes={recordsClasses()} recordClasses={recordClasses()} headerClasses={headerClasses()} />
    )
}

function fnAdminFeedback() {
    return (
        <AdminFeedbacksPage classes={recordsClasses()} recordClasses={recordClasses()} headerClasses={headerClasses()} />
    )
}


function fnAdminAppointmentReview() {
    return (
        <AppointmentReview classes={AppointmentReviewStyles()} headerClasses={headerClasses()}></AppointmentReview>
    )
}

function fnDoctorReviewHistory() {
    return (
        <DoctorReviewHistory classes={DoctorReviewHistoryStyles()} headerClasses={headerClasses()}></DoctorReviewHistory>
    )
}

function fnDoctorLogin() {
    return (
        <DoctorLogin classes={loginClasses()} identity={"Doctor"} headerClasses={headerClasses()}></DoctorLogin>
    )
}

function fnDoctorFrontPage() {
    return (
        <DoctorFrontPage classes={FrontStyles()} headerClasses={headerClasses()}></DoctorFrontPage>
    )
}

function fnDoctorTime() {
    return (
        <DoctorTime classes={FrontStyles()} headerClasses={headerClasses()}></DoctorTime>
    )
}

function fnDoctorAppointment() {
    return (
        <DoctorAppointment classes={FrontStyles()} headerClasses={headerClasses()}></DoctorAppointment>
    )
}

function fnDoctorInfo() {
    return (
        <DoctorInfo classes={DoctorInfoStyles()} headerClasses={headerClasses()}></DoctorInfo>
    )
}

function fnAdminToModifyTheDoctorInfo() {
    return (
        <DoctorInfoForAdminToModify classes={UserInfoStyles()} headerClasses={headerClasses()}></DoctorInfoForAdminToModify>
    )
}

// todo: this should be fixed
const wrapper = withRouter(App);
export default App;
export { wrapper as App };