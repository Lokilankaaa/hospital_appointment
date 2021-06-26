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

interface headerProps {
    classes: ClassNameMap,
}

class WelcomeHeader extends React.Component<headerProps, {}> {
    constructor(props: headerProps) {
        super(props);
        this.login.bind(this);
        this.logout.bind(this);
    }

    login() {
        history.push(getLoginRoute());
    }

    logout() {
        userStateInfoManager.UserLogout();
    }

    render() {
        return (
            <Paper className={this.props.classes.root} elevation={0}>
                <img className={this.props.classes.img} src={welcomelogo} alt={"浙江大学某某医院"}/>
                <Typography className={this.props.classes.title1}>浙江大学某某医院</Typography>
                {
                    (() => {
                        if (userStateInfoManager.isLogin())
                            return <Typography>{userStateInfoManager.getUserName()}</Typography>
                    })()
                }
                <Button variant={"contained"} className={this.props.classes.button}
                        onClick={() => userStateInfoManager.isLogin() ? this.logout() : this.login()}>
                    {
                        (() => {
                            if (userStateInfoManager.isLogin()) {
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