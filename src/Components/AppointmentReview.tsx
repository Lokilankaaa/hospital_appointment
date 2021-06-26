import * as React from "react";
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import avatar_g from '../Assets/per_girl.png';
import avatar_b from '../Assets/per_boy.png';
import {Lambda, observable, reaction, makeObservable} from "mobx";
import DateFnsUtils from '@date-io/date-fns';
import {inject, observer} from "mobx-react";
import {SignUpProps} from '../Models/Login';
import {getLoginRoute, getSignUpRoute} from "../Helpers/Routers";
import {Link} from "react-router-dom";
import history from '../Helpers/History';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import DetailCard from "./detailCard";
import {detailPageProps, detailProps} from "../Models/DocDetail";
import {ClassNameMap} from "@material-ui/styles/withStyles";
import {cardClasses} from "../Styles/madeStyles";
import WelcomeHeader from "./welcomeHeader";
import Avatar from '@material-ui/core/Avatar';

import Rating from '@material-ui/lab/Rating';

interface DoctorInfo{
    docName: string,
    docImg: string,
    docTitle: string,
    docDepartment: string
}

interface AppointmentInfo {
    Department: string,
    time: string
}

interface Review {
    content:string,
    star: number
}

@observer
class AppointmentReview extends React.Component<SignUpProps, {}> {

    constructor(props: SignUpProps) {
        super(props);
        makeObservable(this);
    }

    @observable private docInfo: DoctorInfo = {
        docName: "华佗",
        docImg: "None",
        docTitle: "副主任医师",
        docDepartment: "呼吸科专家诊室"
    }

    @observable private appointment: AppointmentInfo = {
        Department: "呼吸科专家诊室",
        time: "2021/04/11"
    }

    @observable private review: Review = {
        content: "",
        star: 0
    }

    private publishReview() {
        console.log("Published!")
    }

    private renderDoctorInfo() {
        return (            
        <Card className={this.props.classes.appointmentInfo} >
            <CardHeader
                avatar={
                    <Avatar alt={this.docInfo.docName} src={this.docInfo.docImg}/>
                }
                title={this.docInfo.docName}
                subheader={this.docInfo.docTitle}
            />
            <CardContent>
                <Typography className={this.props.classes.title} color="textSecondary" gutterBottom>
                    {this.appointment.Department}
                </Typography>
                <Typography className={this.props.classes.title} color="textSecondary" gutterBottom>
                    挂号时间: {this.appointment.time}
                </Typography>
            </CardContent>
        </Card>
        )
    }

    private renderWriteComments() {
        return ( 
        <TextField fullWidth multiline id="userinfo.Gender" variant="outlined" placeholder={ "从多个角度评价医生，可以帮助更多患者" }  
        type="password" rows={8}
        onChange={ (data) => { this.review.content = data.target.value } }/> 
        )
    }

    private renderStarRating() {
        return ( 
        <Grid container spacing={5} justify="flex-end">
            <Grid item>
                <Typography variant="h5">综合评分</Typography>
            </Grid>
            <Grid item>
                <Rating
                    name="simple-controlled" size="large" precision={0.5}
                    onChange={(event, newValue) => {
                    this.review.star = newValue ? newValue : 5;
                    }}
                />
             </Grid>
          </Grid>
        )
    }

    render() {
        return (
            <Grid container style={{marginTop:"10%", marginLeft:"20%", width:"60%"}}>
                <Grid item  xs={8}>
                    <Grid container spacing={5}>
                        <Grid item xs={5}>
                            { this.renderDoctorInfo() }
                        </Grid>
                        <Grid item xs={7}  alignItems="flex-end" justify="flex-end" style={{ display: "flex"}}>
                            {this.renderStarRating()} 
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item  xs={8} style={{marginTop:"1%"}}>
                    { this.renderWriteComments() }
                </Grid>
                <Grid item  xs={8} style={{marginTop:"1%", display: "flex"}} justify="center" >
                    <Button type="submit" className={ this.props.classes.PublishReviewButton } disabled={ this.review.content === ""  }
                            onClick={() => { this.publishReview() }  } style={{width:"20%"}} >
                                    {"提交"}
                                    
                    </Button>
                </Grid>
           
            </Grid>
        )
    }
}

export default AppointmentReview