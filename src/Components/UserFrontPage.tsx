import * as React from "react";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import hosLogo from '../Assets/hoslogo.svg'
import { Lambda, observable, reaction, makeObservable } from "mobx";
import { inject, observer } from "mobx-react";
import { SignUpProps } from '../Models/Login';

import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';


class UserFrontPage extends React.Component<SignUpProps, {}> {

    constructor(props: SignUpProps) {
        super(props);
    }

    private tiers = [
        {
          title: 'Free',
          price: '0',
          description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
          buttonText: 'Sign up for free',
          buttonVariant: 'outlined',
        },
        {
          title: 'Pro',
          subheader: 'Most popular',
          price: '15',
          description: [
            '20 users included',
            '10 GB of storage',
            'Help center access',
            'Priority email support',
          ],
          buttonText: 'Get started',
          buttonVariant: 'contained',
        },
        {
          title: 'Enterprise',
          price: '30',
          description: [
            '50 users included',
            '30 GB of storage',
            'Help center access',
            'Phone & email support',
          ],
          buttonText: 'Contact us',
          buttonVariant: 'outlined',
        },
      ];

    render() {
        return (
         <div className={this.props.classes.root}>
            <Container maxWidth="md" component="main">
                <Grid container spacing={10} alignItems="flex-end"> 
                    {this.tiers.map((tier) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
                        <Card>
                            <CardHeader
                            title={tier.title}
                            subheader={tier.subheader}
                            titleTypographyProps={{ align: 'center' }}
                            subheaderTypographyProps={{ align: 'center' }}
                            action={tier.title === 'Pro' ? <StarIcon /> : null}
                            className={this.props.classes.cardHeader}
                            />
                            <CardContent>
                            <div className={this.props.classes.cardPricing}>
                                <Typography component="h2" variant="h3" color="textPrimary">
                                ${tier.price}
                                </Typography>
                                <Typography variant="h6" color="textSecondary">
                                /mo
                                </Typography>
                            </div>
                            <ul>
                                {tier.description.map((line) => (
                                <Typography component="li" variant="subtitle1" align="center" key={line}>
                                    {line}
                                </Typography>
                                ))}
                            </ul>
                            </CardContent>
                            <CardActions>
                            <Button fullWidth color="primary">
                                {tier.buttonText}
                            </Button>
                            </CardActions>
                        </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
        )
    }
}

export default UserFrontPage