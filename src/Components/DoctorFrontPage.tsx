import * as React from "react";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import hosLogo from '../Assets/hoslogo.svg'
import login from '../Assets/login.png'
import lookup from '../Assets/lookup.png'
import more from '../Assets/more.png'
import Register from '../Assets/Register.png'
import frontPage from '../Assets/frontPage.png'

import {Lambda, observable, reaction, makeObservable} from "mobx";
import {inject, observer} from "mobx-react";
import {SignUpProps} from '../Models/Login';

import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import history from '../Helpers/History';
import {getLoginRoute, getSignUpRoute, getDocDetail, getLookup, getUserInfoRoute} from "../Helpers/Routers";
import moment from "moment";
import WelcomeHeader from "./welcomeHeader";
import {userStateInfoManager} from '../Helpers/UserStateInfoManager';

class DoctorFrontPage extends React.Component<SignUpProps, {}> {

    constructor(props: SignUpProps) {
        super(props);
    }

    images = [
        {
            url: Register,
            title: '时间设置',
            width: '23%',
            Onclick: () => {
                history.push(getDocDetail());
            }
        },
        {
            url: login,
            title: '个人评论',
            width: '23%',
            Onclick: () => {
                history.push(getLoginRoute())
            }
        },
        {
            url: lookup,
            title: '预约查询',
            width: '23%',
            Onclick: () => {
                history.push(getLookup());
            }
        },
        {
            url: more,
            title: '个人信息',
            width: '23%',
            Onclick: () => {
                history.push(getUserInfoRoute());
            }
        },
    ];

    private renderTabs() {
        return (
            <div className={this.props.classes.tabsRoot}>
                <Container maxWidth="xl" component="main">


                    <Grid container>

                        {this.images.map((image) => (
                            <ButtonBase
                                focusRipple
                                key={image.title}
                                className={this.props.classes.ButonBase}
                                focusVisibleClassName={this.props.classes.focusVisible}
                                onClick={image.Onclick}
                            >

                                <span className={this.props.classes.imageBackdrop}/>
                                <span className={this.props.classes.imageButton}>
                            <Typography
                                component="span"
                                variant="h6"
                                color="inherit"
                                className={this.props.classes.imageTitle}
                            >
                              {image.title}
                            </Typography>
                          </span>
                                <div className="container">
                                    <img className={this.props.classes.imageSrc} src={image.url} alt="fireSpot"/>
                                </div>
                            </ButtonBase>
                        ))}

                    </Grid>
                </Container>

            </div>
        );
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                    <Grid container>
                        <Grid xs={12} item>
                            <WelcomeHeader classes={this.props.headerClasses}/>
                        </Grid>
                        <Grid xs={12} item className={this.props.classes.footTextBox}>
                            <span className={this.props.classes.backgroundImg} style={{backgroundImage: `url(${frontPage})`}}>
                                {this.renderTabs()}
                            </span>
                        </Grid>
                </Grid>
            </div>
        );
    }
}

export default DoctorFrontPage