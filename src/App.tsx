import './App.css';
import Login from './Components/login'
import SignUp from './Components/SignUp'
import UserInfo from './Components/UserInfo'
import UserFrontPage from './Components/UserFrontPage'
import AdminFrontPage from './Components/AdminFrontPage'
import DocDetails from './Components/DoctorDetails'
import AppointmentReview from './Components/AppointmentReview'
import DoctorReviewHistory from './Components/DoctorReviewHistory'

import {loginClasses, FrontStyles, detailPageClasses, cardClasses, headerClasses, recordClasses, recordsClasses, UserInfoStyles, AppointmentReviewStyles, DoctorReviewHistoryStyles} from "./Styles/madeStyles";
import {Route, RouteComponentProps, Switch, withRouter, Router} from 'react-router-dom';
import {getLoginRoute, getSignUpRoute, getDocDetail, getLookup, getUserInfoRoute, getAdminRoute, getAppointmentReviewRoute, getDoctorReviewHistoryRoute} from "./Helpers/Routers";
import {Provider, observer} from "mobx-react";

import history from './Helpers/History';
import RecordPage from "./Components/registeryRecords";

// page navigation https://rookiecoder.medium.com/react-button-click-navigate-to-new-page-6af7397ea220
function App() {
    return (
        <Router history={history}>
            <Switch>
                // add your compoment and URl in here
                <Route exact path={getLoginRoute()} component={fnLogin}/>
                <Route exact path={"/"} component={fnUserFrontPage}/>
                <Route exact path={getSignUpRoute()} component={fnSignUp}/>
                <Route exact path={getDocDetail()} component={fnDocDetail}/>
                <Route exact path={getLookup()} component={fnLookup}/>
                <Route exact path={getUserInfoRoute()} component={fnUserInfoPage} />
                <Route exact path={getAdminRoute()} component={fnAdminFrontPage} />
                <Route exact path={getAppointmentReviewRoute()} component={fnAdminAppointmentReview} />
                <Route exact path={getDoctorReviewHistoryRoute()} component={fnDoctorReviewHistory} />

            </Switch>
        </Router>
    );
}

// warp to pass argument
function fnLogin() {
    return (
        <Login classes={loginClasses()} identity={"Admin"}></Login>
    )
}

function fnSignUp() {
    return (
        <SignUp classes={loginClasses()}></SignUp>
    )
}

function fnUserFrontPage() {
    return (
        <UserFrontPage classes={FrontStyles()}></UserFrontPage>
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
    <UserInfo classes={UserInfoStyles()} ></UserInfo>
  )
}

function fnAdminFrontPage(){
    return (
        <AdminFrontPage classes={FrontStyles()}></AdminFrontPage>
    )
}

function fnAdminAppointmentReview(){
    return (
        <AppointmentReview classes={AppointmentReviewStyles()}></AppointmentReview>
    )
}

function fnDoctorReviewHistory(){
    return (
        <DoctorReviewHistory classes={DoctorReviewHistoryStyles()}></DoctorReviewHistory>
    )
}
// todo: this should be fixed
const wrapper = withRouter(App);
export default App;
export {wrapper as App};