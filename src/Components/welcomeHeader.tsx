import React from 'react';
import {ClassNameMap} from "@material-ui/styles/withStyles";
import welcomelogo from '../Assets/Register.png';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import moment from "moment";

interface headerProps {
    classes: ClassNameMap,
}

class WelcomeHeader extends React.Component<headerProps, {}> {
    constructor(props: headerProps) {
        super(props);
    }

    render() {
        return (
            <Paper className={this.props.classes.root} elevation={0}>
                <img className={this.props.classes.img} src={welcomelogo} alt={"浙江大学某某医院"}/>
                <Typography className={this.props.classes.title1}>浙江大学某某医院</Typography>
                <Button variant={"contained"} className={this.props.classes.button}>登出</Button>
                <Typography
                    className={this.props.classes.title2}>{moment().format('YYYY-MM-DD hh:mm:ss dddd')}</Typography>
            </Paper>
        )
    }

}

export default WelcomeHeader;