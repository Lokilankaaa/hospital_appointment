import * as React from "react";
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import loginBg from '../Assets/loginBg.png'
import { Lambda, observable, reaction, makeObservable } from "mobx";
import { inject, observer } from "mobx-react";
import { SignUpProps } from '../Models/Login';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

interface SignUpFrom {
    PhoneNumber?: string;
    UserName?: string;
    Passward?: string;
    PasswardConfirm?: string; 
}

@observer
class SignUp extends React.Component<SignUpProps, {}> {

    @observable private SignUpInfo: SignUpFrom;
    constructor(props: SignUpProps) {
        super(props);
        makeObservable(this);
        this.SignUpInfo = {}
    }

    private onClickSignUp = () => {
        console.log(`Sign Up with: username: ${this.SignUpInfo.UserName}, passward: ${this.SignUpInfo.PasswardConfirm}`);
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
                                    <Box display="flex" p={0} style={{marginTop:"5%"}}>
                                        <TextField fullWidth  id="username" label="手机验证码" defaultValue="手机验证码" style={{width:"70%"}}
                                            onChange={(data) => { this.SignUpInfo.PhoneNumber = data.target.value } }/>
                                        <Button type="submit" className={this.props.classes.GetValidationButton} onClick={ this.onClickSendValidation } style={{width:"30%"}} >
                                            获取验证码
                                        </Button>
                                    </Box>
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
                        </Grid>
                    </Grid>
                </Paper>
            </div>
                    
        )
    }
}

export default SignUp