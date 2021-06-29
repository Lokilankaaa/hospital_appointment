import * as React from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {UserInfoProps} from "./UserInfo";
import {getDoctorReviewHistoryRoute, getLoginRoute, getLookup, getUserInfoRoute} from "../Helpers/Routers";
import history from '../Helpers/History';
import {userStateInfoManager} from "../Helpers/UserStateInfoManager";
import {requestManager} from "../Helpers/RequestManager";

class UserInfoCard extends React.Component<UserInfoProps, {}> {
    constructor(props: UserInfoProps) {
        super(props);
        this.appoint.bind(this);
    }

    appoint(tid: number) {
        requestManager.appoint(tid);
    }

    render() {
        return (
            <Card className={this.props.classes.root}>
                <CardHeader
                    title={this.props.Name}
                    subheader={this.props.Gender}
                />
                <CardContent>
                    <Typography className={this.props.classes.title} color="textSecondary" gutterBottom>
                        ID: {this.props.ID}
                    </Typography>
                    <Typography className={this.props.classes.title} color="textSecondary" gutterBottom>
                        Phone Number: {this.props.PhoneNumber}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => {
                        // TODO: There should be a method that can modify other user's information
                        history.push(getUserInfoRoute());
                    }} >修改信息</Button>
                    <Button size="small" onClick={() => history.push(getDoctorReviewHistoryRoute())}>相关评价</Button>
                </CardActions>
            </Card>
        )
    }
}

export default UserInfoCard;