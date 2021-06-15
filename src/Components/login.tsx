import * as React from "react";
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import hosLogo from '../Assets/hoslogo.svg'
import { Lambda, observable, reaction, makeObservable } from "mobx";
import { inject, observer } from "mobx-react";
import { LoginProps } from '../Models/Login';
import { getLoginRoute, getSignUpRoute } from "../Helpers/Routers";
import { Link } from "react-router-dom";
import history from '../Helpers/History';

interface LoginFrom {
    username: string;
    password: string;
}

@observer
class Login extends React.Component<LoginProps, {}> {

    @observable private LoginInfo: LoginFrom;
    constructor(props: LoginProps) {
        super(props);
        makeObservable(this);
        this.LoginInfo = {
            username: "",
            password: "",
        };
    }


    private onClickLogin = () => {
        console.log(`login with: username: ${this.LoginInfo.username}, passward: ${this.LoginInfo.password}`);
    }

    private onClickSignUp = () => {
        console.log(`Sign Up with: username: ${this.LoginInfo.username}, passward: ${this.LoginInfo.password}`);
        history.push(getSignUpRoute())
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={this.props.classes.paper} elevation={3} >
                            <img src={hosLogo} className="hos-logo" alt="logo" />
                            <p>Hello, {this.props.identity}!</p>
                            <form className={this.props.classes.loginForm} onSubmit={(e) => e.preventDefault()}>
                                <TextField id="username" label="username" 
                                           variant="outlined" onChange={(data) => { this.LoginInfo.username = data.target.value } }/>
                                <br/>
                                <TextField id="pass" label="password" 
                                           variant="outlined" onChange={(data) => { this.LoginInfo.password = data.target.value } }/>
                                <br/>
                                <Button type="submit" onClick={ this.onClickLogin }>Log in</Button>
                                <Button type="submit" onClick={ this.onClickSignUp }>Sign up</Button>

                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Login