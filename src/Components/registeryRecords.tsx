import React from 'react';
import {ClassNameMap} from "@material-ui/styles/withStyles";
import welcomelogo from '../Assets/Register.png';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {observer} from "mobx-react";
import {makeObservable, observable} from "mobx";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import WelcomeHeader from './welcomeHeader';
import Grid from '@material-ui/core/Grid';

interface recordForm {
    order: number,
    type: string,
    docName: string,
    time: Date,
    fee: number,
    status: boolean,
}

interface recordProps {
    classes: ClassNameMap,
    recordClasses: ClassNameMap,
    headerClasses: ClassNameMap
}

@observer
class RecordPage extends React.Component<recordProps, {}> {
    @observable private records: Array<recordForm>;

    constructor(props: recordProps) {
        super(props);
        makeObservable(this);
        this.records = new Array<recordForm>();
        this.requestRecords.bind(this);
        this.renderRecords.bind(this);
    }

    requestRecords() {
        for (let i = 0; i < 3; i++) {
            this.records.push({
                order: 1,
                type: "asd",
                docName: "AAA",
                time: new Date(),
                fee: 12,
                status: false
            })
        }
    }

    componentDidMount() {
        this.requestRecords();
    }

    renderOneRecord(record: recordForm) {
        return (
            <ListItem className={this.props.recordClasses.root}>
                <>
                    <Grid item xs={7} sm={1} className={this.props.recordClasses.block}>{record.order}</Grid>
                    <Grid item xs={7} sm={1} className={this.props.recordClasses.block}>{record.type}</Grid>
                    <Grid item xs={7} sm={1} className={this.props.recordClasses.block}>{record.docName}</Grid>
                    <Grid item xs={7} sm={1} className={this.props.recordClasses.block}>{record.time.getSeconds()}</Grid>
                    <Grid item xs={7} sm={1} className={this.props.recordClasses.block}>{record.fee}</Grid>
                    <Grid item xs={7} sm={1} className={this.props.recordClasses.block}>{record.status}</Grid>
                    <Grid item xs={7} sm={1}><Button>取消</Button></Grid>
                </>
            </ListItem>
        )

    }

    renderRecords() {
        if (this.records.length > 0)
            return (
                <>
                    {this.records.map((record) => (
                        this.renderOneRecord(record)))}
                </>
            )
        else {
            return (
                <div/>
            )
        }
    }

    render() {
        return (
            <div>
                <WelcomeHeader classes={this.props.headerClasses}/>
                <div className={this.props.classes.root}>
                    <Paper className={this.props.classes.info} elevation={1} variant={"outlined"}>
                        <Grid container xs={7}>
                            <Grid xs={7} sm={1} className={this.props.recordClasses.block}>序号</Grid>
                            <Grid xs={7} sm={1} className={this.props.recordClasses.block}>科室</Grid>
                            <Grid xs={7} sm={1} className={this.props.recordClasses.block}>医生</Grid>
                            <Grid xs={7} sm={1} className={this.props.recordClasses.block}>日期</Grid>
                            <Grid xs={7} sm={1} className={this.props.recordClasses.block}>费用</Grid>
                            <Grid xs={7} sm={1} className={this.props.recordClasses.block}>状态</Grid>
                            <Grid xs={7} sm={1} className={this.props.recordClasses.block}>操作</Grid>
                            <Grid item xs={7} sm={7}>
                                <List>
                                    {this.renderRecords()}
                                </List>
                            </Grid>
                        </Grid>
                    </Paper>

                </div>
            </div>
        )
    }
}

export default RecordPage;