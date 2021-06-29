import * as React from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {detailProps} from '../Models/DocDetail';
import {getDoctorReviewHistoryRoute, getLoginRoute, getLookup, getUserInfoRoute} from "../Helpers/Routers";
import history from '../Helpers/History';
import {userStateInfoManager} from "../Helpers/UserStateInfoManager";
import {requestManager} from "../Helpers/RequestManager";

class DocInfoCard extends React.Component<detailProps, {}> {
    constructor(props: detailProps) {
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
                    avatar={
                        <Avatar alt={this.props.docName} src={this.props.docImg}/>
                    }
                    title={this.props.docName}
                    subheader={this.props.docTitle}
                />
                <CardContent>
                    <Typography className={this.props.classes.title} color="textSecondary" gutterBottom>
                        TID: {this.props.tid}
                    </Typography>
                    <Typography className={this.props.classes.title} color="textSecondary" gutterBottom>
                        DID: {this.props.did}
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

export default DocInfoCard;