import React from "react";
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import hosLogo from './hoslogo.svg'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);

        this.preservePassword = this.preservePassword.bind(this);
        this.preserveUser = this.preserveUser.bind(this);
        this.signup = this.signup.bind(this)


        this.user = React.createRef();
        this.password = React.createRef();


        this.state = {
            username: null,
            passwd: null,
            classes: this.props.classes
        }
    }

    preserveUser(e) {
        this.setState({
            username: e.target.value
        })
    }

    preservePassword(e) {
        this.setState({
            passwd: e.target.value
        })
    }

    login() {
        console.log(this.state.username, this.state.passwd);
    }

    signup() {
        console.log(this.state.username, this.state.passwd);
    }

    render() {
        return (
            <div className={this.state.classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={this.state.classes.paper} elevation={3} >
                            <img src={hosLogo} className="hos-logo" alt="logo" />
                            <p>Hello, {this.props.identity}!</p>
                            <form className={this.state.classes.loginForm} onSubmit={(e) => e.preventDefault()}>
                                <TextField id="username" label="username" ref={this.user}
                                           variant="outlined" onChange={this.preserveUser}/>
                                <br/>
                                <TextField id="pass" label="password" ref={this.password}
                                           variant="outlined" onChange={this.preservePassword}/>
                                <br/>
                                <Button type="submit" onClick={this.login}>Log in</Button>
                                <Button type="submit" onClick={this.signup}>Sign up</Button>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Login