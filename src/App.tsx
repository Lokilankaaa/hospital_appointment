import './App.css';
import Login from './Components/login'
import SignUp from './Components/SignUp'
import UserFrontPage from './Components/UserFrontPage'
import DocDetails from './Components/DoctorDetails'
import {loginClasses, FrontStyles, detailPageClasses, cardClasses, headerClasses, recordClasses, recordsClasses} from "./Styles/madeStyles";
import {Route, RouteComponentProps, Switch, withRouter, Router} from 'react-router-dom';
import {getLoginRoute, getSignUpRoute, getDocDetail, getLookup} from "./Helpers/Routers";
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

// todo: this shoulf be fixed
const wrapper = withRouter(App);
export default App;
export {wrapper as App};