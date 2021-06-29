import './App.css';
import Login from './Components/login'
import SignUp from './Components/SignUp'
import UserInfo from './Components/UserInfo'
import UserFrontPage from './Components/UserFrontPage'
import AdminFrontPage from './Components/AdminFrontPage'
import AdminUserInfoFrontPage from "./Components/AdminUserInfoFrontPage";
import AdminDoctorListPage from "./Components/AdminDoctorListPage";
import AdminUserListPage from "./Components/AdminUserListPage";
import DocDetails from './Components/DoctorDetails'
import AppointmentReview from './Components/AppointmentReview'
import DoctorReviewHistory from './Components/DoctorReviewHistory'

import {loginClasses, FrontStyles, detailPageClasses, cardClasses, headerClasses, recordClasses, recordsClasses, UserInfoStyles, AppointmentReviewStyles, DoctorReviewHistoryStyles} from "./Styles/madeStyles";
import {Route, RouteComponentProps, Switch, withRouter, Router} from 'react-router-dom';
import {getLoginRoute, getSignUpRoute, getDocDetail, getLookup, getUserInfoRoute, getAdminRoute, getAppointmentReviewRoute, getDoctorReviewHistoryRoute, getManageOrderRoute, getAdminUserInfoFrontRoute, getAdminDoctorInfoRoute, getAdminUserInfoRoute} from "./Helpers/Routers";
import {Provider, observer} from "mobx-react";

import history from './Helpers/History';
import RecordPage from "./Components/registeryRecords";
import AdminUserInfoPage from "./Components/AdminUserInfoFrontPage";

// page navigation https://rookiecoder.medium.com/react-button-click-navigate-to-new-page-6af7397ea220
function App() {
    return (
        <Router history={history}>
            <Switch>
                // add your component and URl in here
                <Route exact path={getLoginRoute()} component={fnLogin}/>
                <Route exact path={"/"} component={fnUserFrontPage}/>
                <Route exact path={getSignUpRoute()} component={fnSignUp}/>
                <Route exact path={getDocDetail()} component={fnDocDetail}/>
                <Route exact path={getLookup()} component={fnLookup}/>
                <Route exact path={getUserInfoRoute()} component={fnUserInfoPage} />
                <Route exact path={getAdminRoute()} component={fnAdminFrontPage} />
                <Route exact path={getAdminUserInfoFrontRoute()} component={fnAdminUserInfoFrontPage} />
                <Route exact path={getAdminDoctorInfoRoute()} component={fnAdminDoctorInfo}/>
                <Route exact path={getAdminUserInfoRoute()} component={fnAdminUserInfo}/>
                <Route exact path={getAppointmentReviewRoute()} component={fnAdminAppointmentReview} />
                <Route exact path={getDoctorReviewHistoryRoute(`:docID`)} component={fnDoctorReviewHistory} />
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
        <DocDetails classes={detailPageClasses()} cardClasses={cardClasses()} headerClasses={headerClasses()}/>
    )
}

function fnLookup() {
    return (
        <RecordPage classes={recordsClasses()} recordClasses={recordClasses()} headerClasses={headerClasses()}/>
    )
}

function fnUserInfoPage() {
  return  (
    <UserInfo classes={UserInfoStyles()} headerClasses={headerClasses()}></UserInfo>
  )
}

function fnAdminFrontPage(){
    return (
        <AdminFrontPage classes={FrontStyles()} headerClasses={headerClasses()}></AdminFrontPage>
    )
}

function fnAdminUserInfoFrontPage() {
    return (
        <AdminUserInfoFrontPage classes={FrontStyles()}></AdminUserInfoFrontPage>
    )
}

function fnAdminDoctorInfo() {
    return (
        <AdminDoctorListPage classes={detailPageClasses()} cardClasses={cardClasses()} headerClasses={headerClasses()}/>
    )
}

function fnAdminUserInfo() {
    return (
        <AdminUserListPage classes={detailPageClasses()} cardClasses={cardClasses()} headerClasses={headerClasses()}/>
    )
}


function fnAdminAppointmentReview(){
    return (
        <AppointmentReview classes={AppointmentReviewStyles()} headerClasses={headerClasses()}></AppointmentReview>
    )
}

function fnDoctorReviewHistory(){
    return (
        <DoctorReviewHistory classes={DoctorReviewHistoryStyles()} headerClasses={headerClasses()}></DoctorReviewHistory>
    )
}

// todo: this should be fixed
const wrapper = withRouter(App);
export default App;
export {wrapper as App};