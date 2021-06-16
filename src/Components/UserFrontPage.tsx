import * as React from "react";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import hosLogo from '../Assets/hoslogo.svg'
import login from '../Assets/login.png'
import lookup from '../Assets/lookup.png'
import more from '../Assets/more.png'
import Register from '../Assets/Register.png'

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

class UserFrontPage extends React.Component<SignUpProps, {}> {

    constructor(props: SignUpProps) {
        super(props);
    }

    images = [
      {
        url: Register,
        title: 'Appointment',
        width: '23%',
        Onclick: () => { console.log(`Click Appointment}`); }
      },
      {
        url: login,
        title: 'Login',
        width: '23%',
        Onclick: () => { history.push(getLoginRoute()) }
      },
      {
        url: lookup,
        title: 'LookUp',
        width: '23%',
        Onclick: () => { console.log(`Click LookUp}`); }
      },
      {
        url: more,
        title: 'More',
        width: '23%',
        Onclick: () => { console.log(`Click More}`); }
      },
    ];

    baseImage = {
        url: hosLogo,
        title: 'Appointment',
        width: '20%',
    };


  private renderTabs() {
      return (
        <div className={this.props.classes.root}>
          <Container maxWidth="xl" component="main">

          <Grid container>
            
              <Typography
                  component="span"
                  variant="h6"
                  color="inherit"
                  className={this.props.classes.FrontText}
                  style={{marginLeft: "1%"}}  >
                { "Front Page" }
              </Typography>
              
              <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  className={this.props.classes.FrontText}
                  style={{marginLeft: "73%", marginTop: "0.5%"}}  >
                { "Welcome, XXX!" }
              </Typography>

              <Button className={this.props.classes.FrontText}
                  style={{backgroundColor: "#F67665", color: "white", width: "5%", height: "100%"}}  >
                          { "QUIt" }
              </Button>
            </Grid>

            <Grid container>

              {this.images.map((image) => (
                      <ButtonBase
                        focusRipple
                        key={image.title}
                        className={this.props.classes.image}
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
                          <img src={image.url} alt="fireSpot"/>
                        </div>
                      </ButtonBase>
              ))}
              
              <div className="container">
                    <img src={this.baseImage.url} alt="fireSpot"/>
              </div>

            </Grid>
          </Container>
          
        </div>
      );
    }

    //             <span  className={this.props.classes.backgroundImg} style={{ backgroundImage: `url(${this.baseImage.url})` }}> </span>
    render() {
        return (
          <div className={this.props.classes.backgroundImg}>

              { this.renderTabs() }
          
          </div>
      );
    }
}

export default UserFrontPage