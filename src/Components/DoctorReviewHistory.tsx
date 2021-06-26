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
import {getLoginRoute, getSignUpRoute, getAppointmentReviewRoute} from "../Helpers/Routers";
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
    rating: string,
    commentNum: number,
    star: number
}

interface UserReview {
    rating: string,
    content: string,
    date: string,
    disease: string,
    delay: number,
    userName: string,
    userImg: string
}

@observer
class DoctorReviewHistory extends React.Component<SignUpProps, {}> {

    constructor(props: SignUpProps) {
        super(props);
        makeObservable(this);
        this.userReview = this.getUserReiviews();
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

    @observable private DocReview: Review = {
        rating: "满意",
        star: 1.5,
        commentNum: 2000
    }

    @observable private userReview: Array<UserReview>;

    private getUserReiviews() {
        let userReviews: Array<UserReview> = [
        {
            rating: "很满意",
            content: "太好了，治好了拖延症. 太好了，治好了拖延症. 太好了，治好了拖延症. 太好了，治好了拖延症. 太好了，治好了拖延症. 太好了，治好了拖延症. 太好了，治好了拖延症.",
            date: "2021/12/31",
            disease: "肺结核",
            delay: 5,
            userName: "王小明",
            userImg: avatar_g,
        },
        {
            rating: " 不满意",
            content: "不行啊，不会治病。不行啊，不会治病。不行啊，不会治病。不行啊，不会治病。不行啊，不会治病。不行啊，不会治病。不行啊，不会治病。不行啊，不会治病。不行啊，不会治病。不行啊，不会治病。",
            date: "2020/12/31",
            disease: "COVOID19",
            delay: 0,
            userName: "李华",
            userImg: avatar_b,
        }
    ]

        return userReviews
    }

    private renderDoctorInfo() {
        return (            
        <Card className={this.props.classes.appointmentInfo} >
            <CardHeader
                avatar={
                    <Avatar alt={this.props.classes.large} src={this.docInfo.docImg}/>
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
        </Card>)
    }

    private renderStarRating() {
        return ( 
        <Grid container spacing={1} justify="flex-start">
            <Grid item>
                <Rating
                    name="simple-controlled" size="large" value={this.DocReview.star} color="textSecondary" precision={0.5}
                    readOnly
                />
             </Grid>
             <Grid item>
                <Typography variant="h6" color="textSecondary"> { this.DocReview.star } |</Typography>
            </Grid>
             <Grid item alignItems="center" style={{ display: "flex"}}>
                <Typography variant="subtitle1" color="textSecondary">{ `医生态度${this.DocReview.star}%满意` }</Typography>
            </Grid>
          </Grid>
        )
    }

    private renderStarRatingCurrrent() {
        return ( 
        <Grid container spacing={1} justify="flex-start">
            <Grid item>
                <Typography variant="h6" color="textSecondary"> { `医生评分${this.DocReview.star}` } </Typography>
                <Rating
                    name="simple-controlled" size="large" value={this.DocReview.star} 
                    color="textSecondary" precision={0.5} 
                    onChange={(event, newValue) => {
                    this.DocReview.star = newValue ? newValue : 5;
                    }} readOnly
                />
                <Button type="submit" className={ this.props.classes.PublishReviewButton } 
                            onClick={ () => { history.push( getAppointmentReviewRoute()) }} style={{width:"100%"}} >
                    {"评价打分"}
                                    
                </Button>
            </Grid>
          </Grid>
        )
    }

    private renderRatingBar() {
        return (
            <Grid container spacing={5} >
                <Grid item xs={8}>
                    { this.renderStarRating() }
                </Grid>
                <Grid item xs={4} justify="flex-end" style={{ display: "flex"}}>
                    <Typography variant="h6" color="textSecondary" style={{ display: "flex", justifyContent: "flex-end"}} >
                        { `${this.DocReview.commentNum}人分享` }
                    </Typography>
                </Grid>
            </Grid>
        )
    }

    private renderOneComment(comment: UserReview) {
        return (
            <Grid item style={{borderBottom: '4px solid #D9D9D9', display: "flex", justifyContent: "center"}}>
                <Grid container style={{marginTop:"5%"}} spacing={3} item xs={11}>
                    <Grid item xs={1}>
                        <Grid container >
                            <Grid item xs={12} style={{ display: "flex", justifyContent: "center"}}>
                                <Avatar className={this.props.classes.large} src={comment.userImg}/>
                            </Grid>
                            <Grid item xs={12} style={{ display: "flex", justifyContent: "center"}}>
                                <Typography variant="subtitle2" color="textSecondary" gutterBottom >
                                            {comment.userName}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={11} >
                        <Grid container>
                            <Grid item xs={12}>
                                <Grid container spacing={0} style={{ backgroundColor: "#F5F5F5"}}>

                                    <Grid item xs={5} style={{ marginLeft: "5%",  backgroundColor: "#F5F5F5"}}>
                                        <Typography variant="subtitle1"  >
                                            { `疾病: ${comment.disease}` }
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography variant="subtitle1" color="textSecondary" >
                                            { `满意度: ${comment.rating}` }
                                        </Typography>
                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} style={{marginTop: "2%"}}>
                                        <Typography variant="subtitle2" >
                                            { `${comment.content}` }
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} style={{marginBottom: "2%"}}>
                                        <Typography variant="subtitle2" color="textSecondary" >
                                            { `${comment.date}(就诊后${comment.delay}天)` }
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }


    render() {
        return (
            <div style={{backgroundColor: '#f6f6f6'}}>
                <WelcomeHeader classes={this.props.headerClasses}/>
                <Grid container style={{marginTop:"6%", display: "flex", justifyContent: "center"}} spacing={1}>
                    <Grid item xs={8}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography className={this.props.classes.title} variant="h4" gutterBottom>
                                    { '患者评价' }
                                </Typography>
                            </Grid>
                            
                            <Grid item xs={12} style={{marginTop:"5%", marginBottom:"5%"}}>
                                { this.renderRatingBar() }
                            </Grid>
                            <Grid item xs={12} style={{backgroundColor: 'white', display: "flex", justifyContent: "center"}}>
                                <Grid container item xs={12} style={{display: "flex", justifyContent: "center"}}>
                                    {this.userReview.map((comment) => (
                                        this.renderOneComment(comment)
                                    ))}
                                </Grid>
                            </Grid>
                            <Grid item></Grid>
                            <Grid item></Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={2}>
                        { this.renderDoctorInfo() }
                        <Grid item>
                            { this.renderStarRatingCurrrent() }
                        </Grid>
                        <Grid item></Grid>
                    </Grid>

                </Grid>
            </div>
        )
    }
}

export default DoctorReviewHistory