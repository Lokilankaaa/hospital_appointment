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

import  OperationStateManager  from "../Helpers/OperationStateManager"
import { OperationStates, OPerationStatus } from '../Models/OperationState'

import Rating from '@material-ui/lab/Rating';
import { DoctorInfo, AppointmentInfo, Review, UserReview } from '../Models/ReviewHistory'
import { requestManager } from "../Helpers/RequestManager";

import Alert from '@material-ui/lab/Alert';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {userStateInfoManager} from "../Helpers/UserStateInfoManager";

@observer
class AppointmentReview extends React.Component<SignUpProps, {}> {

    public postReviewCallBack = (state: OperationStates, msg: string) => {
        this.postReviewStatus.state = state;
        this.postReviewStatus.msg = msg;
        console.log(msg, this.postReviewStatus.msg)
    }

    private postReviewManager = new OperationStateManager(this.postReviewCallBack);
    @observable postReviewStatus: OPerationStatus = {
        state: OperationStates.NotTriggered,
        msg: ""
    };

    constructor(props: SignUpProps) {
        super(props);
        makeObservable(this);
    }

    @observable private docInfo: DoctorInfo = {
        docName: "??????",
        docImg: "??????",
        docTitle: "??????"
    }

    @observable private appointment: AppointmentInfo = {
        Department: "?????????????????????",
        time: "2021/04/11"
    }

    @observable private review: UserReview = {
        cid: -1,
        rating: "??????",
        content: "",
        date: "??????",
        disease: "??????",
        delay: 0,
        userName: "??????",
        userImg: "??????"
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
                    ????????????: {this.appointment.time}
                </Typography>
            </CardContent>
        </Card>
        )
    }

    componentDidMount() {
        let name = localStorage.getItem('docName');
        let title = localStorage.getItem('docdocTitle');
        let depart = localStorage.getItem('doctor_depart');
        let time = localStorage.getItem('time');

        this.docInfo.docName = name ? name : "";
        this.docInfo.docTitle = title ? title : "";

        this.appointment.Department = depart ? depart : "";
        this.appointment.time = time ? time : "";
    }
    
    renderAlert = (state: OperationStates, msg: string) => {
        return new Map([
        [OperationStates.Successful, <Alert severity="success">????????????!</Alert> ],
        [OperationStates.Failed, <Alert severity="error"> ???????????????{ msg }</Alert>],
        [OperationStates.Triggered, <Alert severity="info"> ????????????....... </Alert>],
        [OperationStates.NotTriggered, <div />],
    ]).get(state);
}

    private publishReview() {
        if (userStateInfoManager.isLogin()) {
            requestManager.post_review(this.review, this.postReviewManager)
        } else {
            alert("????????????")
            history.push(getLoginRoute());
        }
    }

    private renderWriteComments() {
        return ( 
        <TextField fullWidth multiline id="userinfo.Gender" variant="outlined" placeholder={ "??????????????????????????????????????????????????????" }  
        type="password" rows={8}
        onChange={ (data) => { this.review.content = data.target.value } }/> 
        )
    }

    render() {
        const postReviewMsg = this.postReviewStatus.msg
        const postReviewstate = this.postReviewStatus.state
        return (
            <div style={{backgroundColor: '#f6f6f6', marginBottom:"10%"}}>
                <Grid container style={{paddingTop:"6%", marginLeft:"20%", width:"60%", backgroundColor: 'white', display: "flex", justifyContent: "center"}}>
                    <Grid item  xs={8}>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                { this.renderDoctorInfo() }
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item  xs={8} style={{marginTop:"1%"}}>
                        { this.renderWriteComments() }
                    </Grid>
                    <Grid item  xs={8} style={{marginTop:"1%", display: "flex"}} justify="center" >
                        <Button type="submit" className={ this.props.classes.PublishReviewButton } disabled={ this.review.content === ""  }
                                onClick={() => { this.publishReview() }  } style={{width:"20%"}} >
                                        {"??????"}
                                        
                        </Button>
                    </Grid>
                </Grid>
                { this.renderAlert(postReviewstate, postReviewMsg) }
            </div>
        )
    }
}

export default AppointmentReview