import * as React from "react";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Lambda, observable, reaction, makeObservable} from "mobx";
import DateFnsUtils from '@date-io/date-fns';
import {inject, observer} from "mobx-react";
import Typography from '@material-ui/core/Typography';
import DetailCard from "./detailCard";
import {detailPageProps, detailProps} from "../Models/DocDetail";
import WelcomeHeader from "./welcomeHeader";
import {requestManager} from "../Helpers/RequestManager";
import {doctorStateInfoManager} from "../Helpers/DoctorStateInfoManager";
import { TimelineConnector } from "@material-ui/lab";
import {ClassNameMap} from "@material-ui/styles/withStyles";

interface Column {
    id: '序号' | '编号' | '日期' | '时间' | '容量' | '余量' | '修改' | '删除';
    label: string;
    minWidth?: number;
    align?: 'right';
}

interface timeForm extends Dictionary{
    order: number
    tid: number,
    date: string,
    time: string,
    capacity: number,
    rest: number,
    modify: string,
    delete: string
}

interface timeProps {
    classes: ClassNameMap,
    timeClasses: ClassNameMap,
    headerClasses: ClassNameMap
}

@observer
class DoctorTime extends React.Component<timeProps, {}> {
    @observable private date: Date;
    @observable private times: Array<timeForm>;
    @observable private morning: boolean;
    @observable private afternoon: boolean;
    @observable private counter: number;

    private columns: Column[] = [
        {id: '序号', label: 'order', minWidth: 100,},
        {id: '编号', label: 'tid', minWidth: 100,},
        {id: '日期', label: 'date', minWidth: 300,},
        {id: '时间', label: 'time', minWidth: 100,},
        {id: '容量', label: 'capacity', minWidth: 100,},
        {id: '余量', label: 'rest', minWidth: 100,},
        {id: '修改', label: 'modify', minWidth: 100,},
        {id: '删除', label: 'delete', minWidth: 100,}
    ];

    constructor(props: timeProps) {
        super(props);
        makeObservable(this);
        this.date = new Date();
        this.times = new Array<timeForm>();
        this.morning = false;
        this.afternoon = false;
        this.counter = 0;
    }

    addTime() {
        let day = this.date.getDate();
        let temp = "2021-07-";
        let para : string;
        if (day < 10) {
            para = temp + "0" + day.toString();
        }
        else {
            para = temp + day.toString();
        }
        if (this.morning) {
            let tid = 1;
            requestManager.doctor_addTime(para, "上午", (_tid: any) => { 
                tid = _tid
                this.counter = this.counter + 1;
                this.times.push({order : this.counter, tid : tid, date : para, time : "上午", capacity : 1, rest : 1, modify : "", delete : ""});
            });
        }
        if (this.afternoon) {
            let tid = 2;
            requestManager.doctor_addTime(para, "下午", (_tid: any) => { 
                tid = _tid 
                this.counter = this.counter + 1;
                this.times.push({order : this.counter, tid : tid, date : para, time : "下午", capacity : 1, rest : 1, modify : "", delete : ""});
            });
        }
    }

    deleteTime(tid: number) {
        requestManager.doctor_deleteTime(tid);
        this.times = this.times.filter((time) => time.tid !== tid);
    }

    renderOneTime(time: timeForm) {
        return (
            <TableRow hover tabIndex={-1} key={time.order}>
                {this.columns.map((column) => {
                    if (column.label === 'delete')
                        return (
                            <TableCell key={column.id} align={column.align}>
                                <Button variant="contained" className={this.props.timeClasses.button}
                                        onClick={() => this.deleteTime(time.tid)}>删除</Button>
                            </TableCell>
                        )
                    else {
                        const value = time[column.label];
                        return (
                            <TableCell key={column.id} align={column.align}>
                                {
                                    ((value: Date | boolean | number | string, label: string) => {
                                        if (value instanceof Date)
                                            return value.toLocaleString();
                                        else
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

    renderTimes() {
        if (this.times.length > 0)
            return (
                this.times.map((time) => (
                    this.renderOneTime(time)))
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
                    <Typography variant="h4" color="inherit" className={this.props.classes.title}>时间设置</Typography>
                    <Grid container spacing={3}>
                        <Grid container item xs={6}>
                            <Grid item xs={9}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="选择日期"
                                        value={this.date}
                                        onChange={(d) => {
                                            if (d) {
                                                this.date = d
                                            }
                                        }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                                <div>
                                    <FormControlLabel
                                        value="end"
                                        control={<Checkbox color="primary" />}
                                        label="上午"
                                        labelPlacement="end"
                                        onClick={(e) => this.morning = (e.target as any).checked}
                                    />
                                    <FormControlLabel
                                        value="end"
                                        control={<Checkbox color="primary" />}
                                        label="下午"
                                        labelPlacement="end"
                                        onClick={(e) => this.afternoon = (e.target as any).checked}
                                    />
                                    <Button variant="contained" color="primary"
                                        onClick={() => this.addTime()}>
                                        新增时间
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Typography variant="h4" color="inherit" className={this.props.classes.title}>时间列表</Typography>
                    <div>
                        <div className={this.props.classes.root}>
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
                                                    return this.renderTimes();
                                                    /*
                                                    if (doctorStateInfoManager.isLogin())
                                                        return this.renderTimes();
                                                    else
                                                        return (<Typography
                                                            className={this.props.classes.warning}>请先登录</Typography>)
                                                            */
                                                })()
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DoctorTime