import React from 'react';
import {ClassNameMap} from "@material-ui/styles/withStyles";
import welcomelogo from '../Assets/Register.png';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import moment from "moment";
import {userStateInfoManager} from "../Helpers/UserStateInfoManager";
import {adminStateInfoManager} from "../Helpers/AdminStateInfoManager";
import {doctorStateInfoManager} from "../Helpers/DoctorStateInfoManager";
import history from '../Helpers/History';
import {getLoginRoute, getDoctorLoginRoute, getAdminLoginRoute} from "../Helpers/Routers";
import {requestManager} from "../Helpers/RequestManager";
import { Lambda, observable, reaction, makeObservable, ObservableMap } from "mobx";
import { inject, observer } from "mobx-react";
import Grid from '@material-ui/core/Grid';

interface headerProps {
    classes: ClassNameMap,
}

@observer
class WelcomeHeader extends React.Component<headerProps, {}> {
    @observable private loginState: boolean = userStateInfoManager.isLogin();
    @observable private currentTime: string = moment().format('YYYY-MM-DD hh:mm:ss dddd');

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

    doctorLogin() {
        history.push(getDoctorLoginRoute())
    }

    doctorLogout(){
        doctorStateInfoManager.DoctorLogout()
        history.push(getDoctorLoginRoute())
    }

    adminLogin() {
        history.push(getAdminLoginRoute())
    }

    adminLogout(){
        adminStateInfoManager.AdminLogout()
        history.push(getAdminLoginRoute())
    }

    componentDidMount() {
        setInterval(()=> this.currentTime = moment().format('YYYY-MM-DD hh:mm:ss dddd'), 1000);
    }

    render() {
        if (adminStateInfoManager.isLogin()){
               return (
                   <Paper className={this.props.classes.root} elevation={0}>
                       <Grid container style={{display: "flex"}}>
                           <Grid item xs={4}>
                               <img className={this.props.classes.img} src={welcomelogo} alt={"浙江大学某某医院"}/>
                               <Typography className={this.props.classes.title1}>浙江大学某某医院</Typography>
                           </Grid>

                           <Grid item xs={8} style={{display: "flex", justifyContent: "flex-end"}}>
                               <Grid container spacing={1} style={{display: "flex", justifyContent: "flex-end"}}>
                                   <Grid item style={{display: "flex", alignItems: "flex-end"}}>
                                       {
                                           (() => {
                                                   return <Typography>欢迎您，{adminStateInfoManager.getaID()}</Typography>
                                           })()
                                       }
                                   </Grid>
                                   <Grid item>
                                       <Button variant={"contained"} className={this.props.classes.button}
                                               onClick={() => this.adminLogout()} >
                                           {"登出"}
                                       </Button>
                                   </Grid>

                                   <Grid item  style={{display: "flex", justifyContent: "flex-end", marginRight: "2%"}}>
                                       <Typography className={this.props.classes.title2} style={{display: "flex", justifyContent: "flex-end"}}>{this.currentTime}</Typography>
                                   </Grid>
                               </Grid>
                           </Grid>
                       </Grid>
                   </Paper>
               )
        }
        //TODO doctor
        if(doctorStateInfoManager.isLogin()){
            return (
                <Paper className={this.props.classes.root} elevation={0}>
                    <Grid container style={{display: "flex"}}>
                        <Grid item xs={4}>
                            <img className={this.props.classes.img} src={welcomelogo} alt={"浙江大学某某医院"}/>
                            <Typography className={this.props.classes.title1}>浙江大学某某医院</Typography>
                        </Grid>

                        <Grid item xs={8} style={{display: "flex", justifyContent: "flex-end"}}>
                            <Grid container spacing={1} style={{display: "flex", justifyContent: "flex-end"}}>
                                <Grid item style={{display: "flex", alignItems: "flex-end"}}>
                                    {
                                        (() => {
                                            return <Typography>欢迎您，{doctorStateInfoManager.getdID()}</Typography>
                                        })()
                                    }
                                </Grid>
                                <Grid item>
                                    <Button variant={"contained"} className={this.props.classes.button}
                                            onClick={() => this.doctorLogout()} >
                                        {"登出"}
                                    </Button>
                                </Grid>

                                <Grid item  style={{display: "flex", justifyContent: "flex-end", marginRight: "2%"}}>
                                    <Typography className={this.props.classes.title2} style={{display: "flex", justifyContent: "flex-end"}}>{this.currentTime}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            )
        }

        if(userStateInfoManager.isLogin()){
            return (
                <Paper className={this.props.classes.root} elevation={0}>
                    <Grid container style={{display: "flex"}}>
                        <Grid item xs={4}>
                            <img className={this.props.classes.img} src={welcomelogo} alt={"浙江大学某某医院"}/>
                            <Typography className={this.props.classes.title1}>浙江大学某某医院</Typography>
                        </Grid>

                        <Grid item xs={8} style={{display: "flex", justifyContent: "flex-end"}}>
                            <Grid container spacing={1} style={{display: "flex", justifyContent: "flex-end"}}>
                                <Grid item style={{display: "flex", alignItems: "flex-end"}}>
                                    {
                                        (() => {
                                            return <Typography>欢迎您，{userStateInfoManager.getUserName()}</Typography>
                                        })()
                                    }
                                </Grid>
                                <Grid item>
                                    <Button variant={"contained"} className={this.props.classes.button}
                                            onClick={() => this.logout()} >
                                        {"登出"}
                                    </Button>
                                </Grid>

                                <Grid item  style={{display: "flex", justifyContent: "flex-end", marginRight: "2%"}}>
                                    <Typography className={this.props.classes.title2} style={{display: "flex", justifyContent: "flex-end"}}>{this.currentTime}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            )
        }
        return (
            <Paper className={this.props.classes.root} elevation={0}>
                <Grid container style={{display: "flex"}}>
                    <Grid item xs={4}>
                        <img className={this.props.classes.img} src={welcomelogo} alt={"浙江大学某某医院"}/>
                        <Typography className={this.props.classes.title1}>浙江大学某某医院</Typography>
                    </Grid>

                    <Grid item xs={8} style={{display: "flex", justifyContent: "flex-end"}}>
                        <Grid container spacing={1} style={{display: "flex", justifyContent: "flex-end"}}>
                            <Grid item>
                                <Button variant={"contained"} className={this.props.classes.button}
                                        onClick={() => this.adminLogin()} >
                                    {
                                        (() => {
                                            return "管理"
                                        })()
                                    }
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant={"contained"} className={this.props.classes.button}
                                        onClick={() => this.doctorLogin()} >
                                    {
                                        (() => {
                                            return "医生"
                                        })()
                                    }
                                </Button>
                            </Grid>
                            <Grid item style={{display: "flex", alignItems: "flex-end"}}>
                                {
                                    (() => {
                                        if (this.loginState)
                                            return <Typography>欢迎您，{userStateInfoManager.getUserName()}</Typography>
                                    })()
                                }
                            </Grid>
                            <Grid item>
                                <Button variant={"contained"} className={this.props.classes.button}
                                        onClick={() => this.loginState ? this.logout() : this.login()} >
                                    {
                                        (() => {
                                            if (this.loginState) {
                                                return "登出";
                                            } else {
                                                return "登录"
                                            }
                                        })()
                                    }
                                </Button>
                            </Grid>

                            <Grid item  style={{display: "flex", justifyContent: "flex-end", marginRight: "2%"}}>
                                <Typography className={this.props.classes.title2} style={{display: "flex", justifyContent: "flex-end"}}>{this.currentTime}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default WelcomeHeader;