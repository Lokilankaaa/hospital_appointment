import * as React from "react";
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import hosLogo from '../Assets/hoslogo.svg'
import { Lambda, observable, reaction, makeObservable } from "mobx";
import { inject, observer } from "mobx-react";
import { SignUpProps } from '../Models/Login';

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

    private passwordValid = () => {
        return  this.SignUpInfo.Passward === this.SignUpInfo.PasswardConfirm
    }

    private InfoValid = () => {
        return  this.passwordValid()
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={this.props.classes.paper} elevation={3} >
                            <img src={hosLogo} className="hos-logo" alt="logo" />
                            <form className={this.props.classes.loginForm} onSubmit={(e) => e.preventDefault()}>
                                <TextField id="username" label="Phone Number" 
                                           variant="outlined" onChange={(data) => { this.SignUpInfo.PhoneNumber = data.target.value } }/>
                                <br/>
                                <TextField id="pass" label="User Name" 
                                           variant="outlined" onChange={(data) => { this.SignUpInfo.UserName = data.target.value } }/>
                                <br/>
                                <TextField id="pass" label="Password" type="password"
                                           variant="outlined" onChange={(data) => { this.SignUpInfo.Passward = data.target.value } }/>
                                <br/>
                                <TextField id="pass" label="ReConfirme Password" type="password"
                                           variant="outlined" onChange={(data) => { this.SignUpInfo.PasswardConfirm = data.target.value } }/>
                                <br/>
                                <Button type="submit" disabled={ !this.InfoValid() } onClick={ this.onClickSignUp }>Sign up</Button>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default SignUp