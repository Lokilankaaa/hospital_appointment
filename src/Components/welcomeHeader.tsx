import React from 'react';
import {ClassNameMap} from "@material-ui/styles/withStyles";
import welcomelogo from '../Assets/Register.png';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import moment from "moment";
import {userStateInfoManager} from "../Helpers/UserStateInfoManager";
import history from '../Helpers/History';
import {getLoginRoute} from "../Helpers/Routers";
import {requestManager} from "../Helpers/RequestManager";
import { Lambda, observable, reaction, makeObservable, ObservableMap } from "mobx";
import { inject, observer } from "mobx-react";

interface headerProps {
    classes: ClassNameMap,
}

@observer
class WelcomeHeader extends React.Component<headerProps, {}> {
    @observable private loginState: boolean = userStateInfoManager.isLogin();

    constructor(props: headerProps) {
        super(props);
        makeObservable(this);
        this.login.bind(this);
        this.logout.bind(this);
    }
    

    login() {
        history.push(getLoginRoute());
    }

    logoutCallBack = () => {
        this.loginState = userStateInfoManager.isLogin();
    }

    logout() {
        requestManager.user_logout(this.logoutCallBack)
    }

    render() {
        const loginState = this.loginState;
        return (
            <Paper className={this.props.classes.root} elevation={0}>
                <img className={this.props.classes.img} src={welcomelogo} alt={"浙江大学某某医院"}/>
                <Typography className={this.props.classes.title1}>浙江大学某某医院</Typography>
                {
                    (() => {
                        if (loginState)
                            return <Typography>{userStateInfoManager.getUserName()}</Typography>
                    })()
                }
                <Button variant={"contained"} className={this.props.classes.button}
                        onClick={() => loginState ? this.logout() : this.login()}>
                    {
                        (() => {
                            if (loginState) {
                                return "登出";
                            } else {
                                return "登录"
                            }
                        })()
                    }
                </Button>
                <Typography
                    className={this.props.classes.title2}>{moment().format('YYYY-MM-DD hh:mm:ss dddd')}</Typography>
            </Paper>
        )
    }
}

export default WelcomeHeader;