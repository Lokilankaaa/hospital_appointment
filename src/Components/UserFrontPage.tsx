import * as React from "react";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import hosLogo from '../Assets/hoslogo.svg'
import login from '../Assets/login.png'
import lookup from '../Assets/lookup.png'
import more from '../Assets/more.png'
import Register from '../Assets/Register.png'
import frontPage from '../Assets/frontPage.png'

import { Lambda, observable, reaction, makeObservable } from "mobx";
import { inject, observer } from "mobx-react";
import { SignUpProps } from '../Models/Login';

import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import history from '../Helpers/History';
import { getLoginRoute, getSignUpRoute } from "../Helpers/Routers";
import moment from "moment";
class UserFrontPage extends React.Component<SignUpProps, {}> {

    constructor(props: SignUpProps) {
        super(props);
    }

    images = [
      {
        url: Register,
        title: '挂号预约',
        width: '23%',
        Onclick: () => { console.log(`Click Appointment}`); }
      },
      {
        url: login,
        title: '登录',
        width: '23%',
        Onclick: () => { history.push(getLoginRoute()) }
      },
      {
        url: lookup,
        title: '查询',
        width: '23%',
        Onclick: () => { console.log(`Click LookUp}`); }
      },
      {
        url: more,
        title: '更多',
        width: '23%',
        Onclick: () => { console.log(`Click More}`); }
      },
    ];

  private renderTabs() {
      return (
        <div className={this.props.classes.tabsRoot}>
          <Container maxWidth="xl" component="main">

            <Box display="flex" p={1} >
            
              <Box p={1} width="100%">
                <Typography
                    component="span"
                    variant="h6"
                    color="inherit"
                    className={this.props.classes.FrontText}>
                  { "首页" }
                </Typography>
              </Box>
                
              <Box p={1} flexShrink={1}>
                <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    className={this.props.classes.FrontText}  >
                  { "欢迎, XXX!" }
                </Typography>
              </Box>

              <Box p={1} flexShrink={0}>
                <Button className={this.props.classes.FrontText}
                    style={{backgroundColor: "#F67665", color: "white", width: 80, height: "100%"}}  >
                            { "退出" }
                </Button>
              </Box>
            </Box >

            <Grid container>

              {this.images.map((image) => (
                      <ButtonBase
                        focusRipple
                        key={image.title}
                        className={this.props.classes.ButonBase}
                        focusVisibleClassName={this.props.classes.focusVisible}
                        onClick={ image.Onclick }
                      >

                        <span className={this.props.classes.imageBackdrop} />
                          <span className={this.props.classes.imageButton} >
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
      let date = moment().format('YYYY-MM-DD hh:mm:ss dddd');

        return (
          <div className={this.props.classes.root}>
           <div className={this.props.classes.footTextBox}>
              <Container maxWidth="xl" component="main">
                <Box display="flex" p={1} >
            
                  <Box p={1} width="100%">
                      <Typography
                            component="span"
                            variant="subtitle1"
                            color='inherit'
                            className={this.props.classes.footText} 
                            style={{color:"#0BDAA4"}} >
                          { "XXX 大学 XX 医院" }
                        </Typography>
                  </Box>
                  <Box p={0} flexShrink={0}>
                    <Typography
                        component="span"
                        variant="subtitle1"
                        color="inherit"
                        className={this.props.classes.footText}  >
                      { date }
                    </Typography>
                  </Box>

                 </Box>
              </Container>
            </div>

            <span  className={this.props.classes.backgroundImg} style={{ backgroundImage: `url(${frontPage})` }}>
              { this.renderTabs() }
            </span>
          </div>
      );
    }
}

export default UserFrontPage