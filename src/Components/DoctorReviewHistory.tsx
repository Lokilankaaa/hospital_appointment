import * as React from "react";
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import avatar_g from '../Assets/per_girl.png';
import avatar_b from '../Assets/per_boy.png';
import {Lambda, observable, reaction, makeObservable, action} from "mobx";
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

import  OperationStateManager  from "../Helpers/OperationStateManager"
import { OperationStates, OPerationStatus } from '../Models/OperationState'

import Rating from '@material-ui/lab/Rating';
import { DoctorInfo, AppointmentInfo, Review, UserReview } from '../Models/ReviewHistory'
import { requestManager } from "../Helpers/RequestManager";

import {RouteComponentProps} from 'react-router';

@observer
class DoctorReviewHistory extends React.Component<SignUpProps, {}> {

    public DoctorReviewHistoryCallBack = (state: OperationStates, msg: string) => {
        this.GetDocReviewHistoryStatus.state = state;
        this.GetDocReviewHistoryStatus.msg = msg;
        console.log(msg, this.GetDocReviewHistoryStatus.msg)
    }

    private LoginStatusManager = new OperationStateManager(this.DoctorReviewHistoryCallBack);
    @observable GetDocReviewHistoryStatus: OPerationStatus = {
        state: OperationStates.NotTriggered,
        msg: ""
    };

    @observable private DoctorReviews = new Array<UserReview>();

    constructor(props: any) {
        super(props);
        makeObservable(this);
    }
    
    @observable private docInfo: DoctorInfo = {
        docName: "未知",
        docImg: "未知",
        docTitle: "未知"
    }

    @observable private DocReview: Review = {
        rating: "满意",
        star: 1.5,
        commentNum: 2000,
        doctorID: "None"
    }

    @observable private test = "NO";
    SetDoctorReviewsCallBack = (reviews: Array<UserReview>) => {
        action(() => {
            for(let i = 0; i < reviews.length; i++) {
                this.DoctorReviews.push(reviews[i]);
            }
            this.test = "yes";
            console.log("DoctorReviews loaded: ", this.DoctorReviews.length, this.test)            
        })()

    }
    
    componentDidMount() {
        let id = localStorage.getItem('docID');
        let name = localStorage.getItem('docName');
        let title = localStorage.getItem('docdocTitle');

        this.docInfo.docName = name ? name : "";
        this.docInfo.docTitle = title ? title : "";
        requestManager.search_reviews({docID: id ? id : ""}, this.LoginStatusManager, this.SetDoctorReviewsCallBack)
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
        </Card>)
    }

    private renderRatingBar() {
        return (
            <Grid container  >
                <Grid item xs={4} justify="flex-start" style={{ display: "flex"}}>
                    <Typography variant="h6" color="textSecondary" style={{ display: "flex", justifyContent: "flex-start"}} >
                        { `${this.DoctorReviews.length}人分享` }
                    </Typography>
                </Grid>
            </Grid>
        )
    }

    private renderReviewCurrrent() {
        return ( 
        <Grid container spacing={0} justify="center" item xs={12}>
            <Grid item  xs={12}>
                <Button fullWidth type="submit" className={ this.props.classes.PublishReviewButton } 
                            onClick={ () => { history.push( getAppointmentReviewRoute()) }} style={{width:"100%"}} >
                    {"评价打分"}
                </Button>
            </Grid>
          </Grid>
        )
    }

    private renderOneComment(comment: UserReview) {
        return (
            <Grid item xs={12} style={{borderBottom: '4px solid #D9D9D9', display: "flex", justifyContent: "center"}}>
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
        const userReview = this.DoctorReviews.slice();
        console.log("reviews len for render:", userReview.length, this.test)
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
                            
                            <Grid item xs={12} style={{marginTop:"1%", marginBottom:"1%"}}>
                                { this.renderRatingBar() }
                            </Grid>
                            <Grid item xs={12} style={{backgroundColor: 'white', display: "flex", justifyContent: "center"}}>
                                <Grid container item xs={12} style={{display: "flex", justifyContent: "center"}}>
                                    {userReview.map((comment) => (
                                        this.renderOneComment(comment)
                                    ))}
                                </Grid>
                            </Grid>
                            <Grid item></Grid>
                            <Grid item></Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={2}>
                        <Grid item>
                            { this.renderDoctorInfo() }
                        </Grid>
                        <Grid item xs={12}>
                            { this.renderReviewCurrrent() }
                        </Grid>
            
                    </Grid>

                </Grid>
            </div>
        )
    }
}

export default DoctorReviewHistory