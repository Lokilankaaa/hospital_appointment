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
import { LoginFrom, LoginResponse } from '../Models/Login'
import { requestManager } from "../Helpers/RequestManager";
import  OperationStateManager  from "../Helpers/OperationStateManager"
import { OperationStates, OPerationStatus } from '../Models/OperationState'
import Alert from '@material-ui/lab/Alert';
import WelcomeHeader from "./welcomeHeader";


@observer
class Login extends React.Component<LoginProps, {}> {

    public loginStateCallBack = (state: OperationStates, msg: string) => {
        this.loginStatus.state = state;
        this.loginStatus.msg = msg;
        console.log(msg, this.loginStatus.msg)
        
        // jump to previous page
        if(this.loginStatus.state === OperationStates.Successful) {
            history.goBack()
        }
    }

    @observable private LoginInfo: LoginFrom;
    private LoginStatusManager = new OperationStateManager(this.loginStateCallBack);
    @observable loginStatus: OPerationStatus = {
        state: OperationStates.NotTriggered,
        msg: ""
    };
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
        requestManager.user_login(this.LoginInfo, this.LoginStatusManager);
    }

    public loginCallBack = (result: LoginResponse) => {
        console.log(`Sign Up is: ${result.success}, with msg: ${result.err}`);
    }

    private onClickSignUp = () => {
        console.log(`login with: username: ${this.LoginInfo.username}, passward: ${this.LoginInfo.password}`);
        history.push(getSignUpRoute())
    }

    renderAlert = (state: OperationStates, msg: string) => {
        return new Map([
        [OperationStates.Successful, <Alert severity="success">登录成功!</Alert> ],
        [OperationStates.Failed, <Alert severity="error"> 登录失败：{ msg }</Alert>],
        [OperationStates.Triggered, <Alert severity="info"> 正在登录....... </Alert>],
        [OperationStates.NotTriggered, <div />],
    ]).get(state);
}
    render() {            
        const loginerrMsg = this.loginStatus.msg
        const loginstate = this.loginStatus.state
        return (
            <div className={this.props.classes.root}>
                <Paper className={this.props.classes.paper} elevation={3} >
                    <Grid container spacing={0}>
                        <Grid xs={12} item>
                            <WelcomeHeader classes={this.props.headerClasses}/>
                        </Grid>
                        <Grid xs={6} item>
                            <img src={loginBg} className="hos-logo" alt="logo" style={{width:"100%"}}/>
                        </Grid>
                        <Grid item xs={5} style={{marginLeft:"8%"}}>
                            <Grid item style={{marginTop:"5%", width:"80%"}}>
                                <Typography
                                    component="span"
                                    variant="h4"
                                    color="inherit"
                                    className={this.props.classes.FrontText}>
                                您好, 请登录!
                                </Typography>
                            </Grid>
                            <Grid item style={{marginTop:"5%", marginRight:"15%", width:"80%"}}>
                                <form className={this.props.classes.loginForm} onSubmit={(e) => e.preventDefault()}>
                                    <Grid item>
                                        <TextField fullWidth id="username" label="用户名" placeholder="用户名" style={{marginTop:20}}
                                                    onChange={(data) => { this.LoginInfo.username = data.target.value } }/>
                                    </Grid>
                                    <Grid item>
                                        <TextField fullWidth id="pass" label="密码" type="password" placeholder="密码" style={{marginTop:20}}
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
                            <Grid item style={{marginTop:"5%", marginRight:"15%", height:1}}>
                                { this.renderAlert(loginstate, loginerrMsg) }
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        )
    }
}

export default Login