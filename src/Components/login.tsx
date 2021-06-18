import * as React from "react";
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import loginBg from '../Assets/loginBg.png'
import { Lambda, observable, reaction, makeObservable } from "mobx";
import { inject, observer } from "mobx-react";
import { LoginProps } from '../Models/Login';
import { getLoginRoute, getSignUpRoute } from "../Helpers/Routers";
import { Link } from "react-router-dom";
import history from '../Helpers/History';
import Typography from '@material-ui/core/Typography';

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
                <Paper className={this.props.classes.paper} elevation={3} >
                    <Grid container spacing={0}>
                            <img src={loginBg} className="hos-logo" alt="logo" style={{width:"50%"}}/>
                        <Grid item style={{marginLeft:"5%", width:"45%"}}>
                            <Grid item style={{marginTop:"5%", width:"80%"}}>
                                <Typography
                                    component="span"
                                    variant="h4"
                                    color="inherit"
                                    className={this.props.classes.FrontText}>
                                您好, {this.props.identity}!
                                </Typography>
                            </Grid>
                            <Grid item style={{marginTop:"5%", marginRight:"15%", width:"80%"}}>
                                <form className={this.props.classes.loginForm} onSubmit={(e) => e.preventDefault()}>
                                    <Grid item>
                                        <TextField fullWidth id="username" label="用户名" defaultValue="用户名" style={{marginTop:20}}
                                                    onChange={(data) => { this.LoginInfo.username = data.target.value } }/>
                                    </Grid>
                                    <Grid item>
                                        <TextField fullWidth id="pass" label="密码" type="password" defaultValue="密码" style={{marginTop:20}}
                                                onChange={(data) => { this.LoginInfo.password = data.target.value } }/>
                                    </Grid>
                                    <Grid item>
                                            <Button type="submit" className={this.props.classes.loginButton} onClick={ this.onClickLogin }>登录</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button type="submit" className={this.props.classes.loginButton} onClick={ this.onClickSignUp }>注册</Button>
                                    </Grid>
                                </form>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        )
    }
}

export default Login