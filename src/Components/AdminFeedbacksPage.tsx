import React from 'react';
import {ClassNameMap} from "@material-ui/styles/withStyles";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {observer} from "mobx-react";
import {makeObservable, observable} from "mobx";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from "@material-ui/core/Typography";
import {userStateInfoManager} from "../Helpers/UserStateInfoManager";
import {requestManager} from "../Helpers/RequestManager";
import WelcomeHeader from "./welcomeHeader";

interface Column {
    id: '序号' | '科室' | '医生姓名' | '预约日期' | '挂号费' | '状态' | '操作';
    label: string;
    minWidth?: number;
    align?: 'right';
}


interface recordForm extends Dictionary {
    tid: number,
    did: string,
    order: number,
    type: string,
    docName: string,
    time: Date,
    fee: number,
    status: string,
}

interface recordProps {
    classes: ClassNameMap,
    recordClasses: ClassNameMap,
    headerClasses: ClassNameMap
}

@observer
class AdminFeedbacksPage extends React.Component<recordProps, {}> {
    @observable private records: Array<recordForm>;

    private columns: Column[] = [
        {id: '序号', label: 'order', minWidth: 60,},
        {id: '科室', label: 'type', minWidth: 100,},
        {
            id: '医生姓名',
            label: 'docName',
            minWidth: 70,
        },
        {
            id: '预约日期',
            label: 'time',
            minWidth: 270,
        },
        {
            id: '挂号费',
            label: 'fee',
            minWidth: 170,
        },
        {
            id: '状态',
            label: 'status',
            minWidth: 150,
        },
        {
            id: '操作',
            label: 'operation',
            minWidth: 60,
        }
    ];

    constructor(props: recordProps) {
        super(props);
        makeObservable(this);
        this.records = new Array<recordForm>();
        this.requestRecords.bind(this);
        this.renderRecords.bind(this);
        this.cancel_appointment.bind(this);
    }

    requestRecords() {
        requestManager.admin_search_appointment("", this.records);
    }

    cancel_appointment(order: number) {
        requestManager.admin_cancel_appointment(this.records[order - 1].tid)
        this.records = this.records.filter((record) => record.order !== order);
    }

    componentDidMount() {
        this.requestRecords();
    }

    renderOneRecord(record: recordForm) {
        return (
            <TableRow hover tabIndex={-1} key={record.order}>
                {this.columns.map((column) => {
                    if (column.label === 'operation')
                        return (
                            <TableCell key={column.id} align={column.align}>
                                <Button variant="contained" className={this.props.recordClasses.button}
                                        disabled={record.status === "未取号"}
                                        onClick={() => this.cancel_appointment(record.order)}>取消</Button>
                            </TableCell>
                        )
                    else {
                        const value = record[column.label];
                        return (
                            <TableCell key={column.id} align={column.align}>
                                {
                                    ((value: Date | boolean | number | string, label: string) => {
                                        if (value instanceof Date)
                                            return value.toLocaleString();
                                        else if (typeof value == 'boolean')
                                            return value ? '已取号' : '未取号';
                                        else if (typeof value == 'number') {
                                            if (label === 'order')
                                                return value;
                                            else
                                                return '¥' + value.toFixed(2);
                                        } else
                                            return value;
                                    })(value, column.label)
                                }
                            </TableCell>
                        );
                    }
                })}
            </TableRow>
        )
    }

    renderRecords() {
        if (this.records.length > 0)
            return (
                this.records.map((record) => (
                    this.renderOneRecord(record)))
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
                <div className={this.props.classes.root}>
                    <WelcomeHeader classes={this.props.headerClasses}/>
                    <Typography variant={"h4"} className={this.props.classes.title}>反馈管理</Typography>
                    <Paper>
                        <TableContainer className={this.props.classes.container}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {this.columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{minWidth: column.minWidth}}
                                            >
                                                {column.id}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        (() => {
                                            return this.renderRecords();
                                        })()
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </div>
            </div>
        )
    }
}

export default AdminFeedbacksPage;