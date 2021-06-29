import * as React from "react";
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import loginBg from '../Assets/loginBg.png'
import { Lambda, observable, reaction, makeObservable, action } from "mobx";
import { inject, observer } from "mobx-react";
import { SignUpProps } from '../Models/Login';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { requestManager } from '../Helpers/RequestManager'
import { SignUpForm, SignupResponse, SignupRequest } from '../Models/SignUp'
import  OperationStateManager  from "../Helpers/OperationStateManager"
import { OperationStates, OPerationStatus } from '../Models/OperationState'
import Alert from '@material-ui/lab/Alert';
import history from '../Helpers/History';
import WelcomeHeader from "./welcomeHeader";

@observer
class SignUp extends React.Component<SignUpProps, {}> {

    public SignUpStateCallBack = (state: OperationStates, msg: string) => {
        action (() => {
            this.SignUpStatus.msg = msg;
            this.SignUpStatus.state = state;
        })()
        console.log(msg, this.SignUpStatus.msg)
        
        // jump to previous page
        if(this.SignUpStatus.state == OperationStates.Successful) {
            history.goBack()
            
        }
    }

    private SignUpStatusManager = new OperationStateManager(this.SignUpStateCallBack);
    @observable SignUpStatus: OPerationStatus = {
        state: OperationStates.NotTriggered,
        msg: ""
    };

    @observable private SignUpInfo: SignUpForm;
    constructor(props: SignUpProps) {
        super(props);
        makeObservable(this);
        this.SignUpInfo = {
            PhoneNumber: "",
            UserName: "",
            Passward: "",
            PasswardConfirm: ""
        }
    }

    private onClickSignUp = () => {
        console.log(`Sign Up with: username: ${this.SignUpInfo.UserName}, passward: ${this.SignUpInfo.PasswardConfirm}`);
        requestManager.user_signup(this.SignUpInfo, this.SignUpStatusManager);
    }

    private SignUpCallBack = (result: SignupResponse) => {
        console.log(`Sign Up is: ${result.success}, with msg: ${result.err}`);
    }

    private onClickSendValidation = () => {
        console.log(`Sign Up with: username: ${this.SignUpInfo.UserName}, passward: ${this.SignUpInfo.PasswardConfirm}`);
    }

    private passwordValid = () => {
        return  this.SignUpInfo.Passward === this.SignUpInfo.PasswardConfirm
    }

    private InfoValid = () => {
        return  this.passwordValid()
    }

    renderAlert = (state: OperationStates, msg: string) => {
        return new Map([
        [OperationStates.Successful, <Alert severity="success">注册成功!</Alert> ],
        [OperationStates.Failed, <Alert severity="error"> 注册失败：{ msg }</Alert>],
        [OperationStates.Triggered, <Alert severity="info"> 正在注册....... </Alert>],
        [OperationStates.NotTriggered, <div />],
    ]).get(state);
}

    render() {
        const SignUperrMsg = this.SignUpStatus.msg
        const SignUpstate = this.SignUpStatus.state
        return (
            <div className={this.props.classes.root}>
                <WelcomeHeader classes={this.props.headerClasses}/>
                 <Paper className={this.props.classes.paper} elevation={3} >
                    <Grid container spacing={0}>
                        <Grid xs={6} item>
                            <img src={loginBg} className="hos-logo" alt="logo" style={{width:"100%"}}/>
                        </Grid>
                        <Grid item style={{marginLeft:"5%", width:"45%"}}>
                            <Grid item style={{marginTop:"5%", width:"80%"}}>
                                <Typography
                                    component="span"
                                    variant="h4"
                                    color="inherit"
                                    className={this.props.classes.FrontText}>
                                { "欢迎注册!" }
                                </Typography>
                            </Grid>
                            <Grid item style={{marginTop:"5%", width:"80%"}}>
                                <form className={this.props.classes.loginForm} onSubmit={(e) => e.preventDefault()}>
                                    <Grid item style={{marginTop:"5%"}}>
                                        <TextField fullWidth  id="pass" label="用户名" defaultValue="用户名" 
                                            onChange={(data) => { this.SignUpInfo.UserName = data.target.value } }/>
                                    </Grid>
                                    <Grid item style={{marginTop:"5%"}}>
                                        <TextField fullWidth  id="username" label="电话号码" defaultValue="电话号码"
                                            onChange={(data) => { this.SignUpInfo.PhoneNumber = data.target.value } }/>
                                    </Grid>
                                    <Grid item style={{marginTop:"5%"}}>
                                        <TextField fullWidth  id="username" label="身份证号码" defaultValue="身份证号码"
                                            onChange={(data) => { this.SignUpInfo.PhoneNumber = data.target.value } }/>
                                    </Grid>
                                    <Grid item style={{marginTop:"5%"}}>
                                        <TextField fullWidth  id="pass" label="密码" defaultValue="XXOO" type="password"
                                            onChange={(data) => { this.SignUpInfo.Passward = data.target.value } }/>
                                    </Grid>
                                        <Grid item style={{marginTop:"5%", width:"100%"}}>
                                        <TextField fullWidth  id="pass" label="确认密码" defaultValue="XXXX" type="password"
                                            onChange={(data) => { this.SignUpInfo.PasswardConfirm = data.target.value } }/>
                                    </Grid>
                                        <Grid item style={{marginTop:"5%", width:"100%"}}>
                                        <Button type="submit" className={this.props.classes.loginButton} disabled={ !this.InfoValid() } onClick={ this.onClickSignUp }>注册</Button>
                                    </Grid>
                                </form>
                            </Grid>    
                            <Grid item style={{marginTop:"5%", marginRight:"15%", height:1}}>
                                { this.renderAlert(SignUpstate, SignUperrMsg) }
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
                    
        )
    }
}

export default SignUp