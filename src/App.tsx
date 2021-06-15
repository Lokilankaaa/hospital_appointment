import './App.css';
import Login from './Components/login'
import SignUp from './Components/SignUp'
import { loginClasses } from "./Styles/madeStyles";
import { Route, RouteComponentProps, Switch, withRouter, BrowserRouter } from 'react-router-dom';
import { getLoginRoute, getSignUpRoute } from "./Helpers/Routers";
import { Provider, observer } from "mobx-react";

// todo: this is not working???
function App() {
  return (
    <BrowserRouter >
      <Switch>
            <Route exact path={getLoginRoute()} component={fnLogin} />
            <Route exact path={"/"} component={fnLogin} />
            <Route exact path={getSignUpRoute()} component={fnSignUp} />
      </Switch>
      </BrowserRouter >
  );
}
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