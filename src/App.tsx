import './App.css';
import Login from './Components/login'
import SignUp from './Components/SignUp'
import { loginClasses } from "./Styles/madeStyles";
import { Route, RouteComponentProps, Switch, withRouter,Router } from 'react-router-dom';
import { getLoginRoute, getSignUpRoute } from "./Helpers/Routers";
import { Provider, observer } from "mobx-react";
import history from './Helpers/History';

// page navigation https://rookiecoder.medium.com/react-button-click-navigate-to-new-page-6af7397ea220
function App() {
  return (
    <Router history={history}>
      <Switch>
        // add your compoment and URl in here
            <Route exact path={getLoginRoute()} component={fnLogin} />
            <Route exact path={"/"} component={fnLogin} />
            <Route exact path={getSignUpRoute()} component={fnSignUp} />
      </Switch>
      </Router >
  );
}

// warp to pass argument
function fnLogin() {
  return  (
    <Login classes={loginClasses()} identity={"Admin"} ></Login>
  )
}

function fnSignUp() {
  return  (
    <SignUp classes={loginClasses()} ></SignUp>
  )
}

// todo: this shoulf be fixed
const wrapper = withRouter(App);
export default App;
export { wrapper as App };