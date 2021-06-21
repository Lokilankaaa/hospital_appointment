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
            <ListItem className={this.props.classes.root}>
                <>
                    <span>{record.order}</span>
                    <span>{record.type}</span>
                    <span>{record.docName}</span>
                    <span>{record.time.getSeconds()}</span>
                    <span>{record.fee}</span>
                    <span>{record.status}</span>
                </>
            </ListItem>
        )

    }

    renderRecords() {
        if (this.records.length > 0)
            return (
                <>
                    {
                        this.records.map((record) => (
                            this.renderOneRecord(record)
                        ))}
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

            <div className={
                this
                    .props
                    .classes
                    .root
            }

            >
                <WelcomeHeader classes={this.props.headerClasses}/>
                <List>
                    {this.renderRecords()}
                </List>
            </div>
        )
    }
}

export default RecordPage;