import * as React from "react";
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import loginBg from '../Assets/loginBg.png'
import {Lambda, observable, reaction, makeObservable} from "mobx";
import DateFnsUtils from '@date-io/date-fns';
import {inject, observer} from "mobx-react";
import {LoginProps} from '../Models/Login';
import {getLoginRoute, getSignUpRoute} from "../Helpers/Routers";
import {Link} from "react-router-dom";
import history from '../Helpers/History';
import Typography from '@material-ui/core/Typography';
import DetailCard from "./detailCard";
import {detailPageProps, detailProps} from "../Models/DocDetail";
import {ClassNameMap} from "@material-ui/styles/withStyles";
import {cardClasses} from "../Styles/madeStyles";

@observer
class DocDetails extends React.Component<detailPageProps, {}> {
    @observable private date: Date;
    @observable private details: Array<detailProps>;

    constructor(props: detailPageProps) {
        super(props);
        makeObservable(this);
        this.handleDateChange.bind(this);
        this.requestDocs.bind(this);
        this.renderDocList.bind(this);
        this.details = new Array<detailProps>();
        this.date = new Date();

    }

    requestDocs(date: Date) {
        for (let i = 0; i < 10; i++)
            this.details.push(
                {
                    classes: this.props.cardClasses,
                    docName: "string",
                    docTitle: "string",
                    remaining: 1,
                    fee: 2,
                    docImg: ""
                }
            )
    }

    handleDateChange() {
        //request for new doc details
        console.log(this.date);
        this.requestDocs(this.date);
    }

    renderDocList() {
        if (this.details.length > 0)
            return this.details.map((detail) => (
                    <Grid item xs={3}>
                        <DetailCard classes={detail.classes} docName={detail.docName} docTitle={detail.docTitle}
                                    remaining={detail.remaining} fee={detail.fee} docImg={detail.docImg}/>
                    </Grid>
                )
            )
        else
            return (<h2>No doctor found</h2>)
    }

    componentDidMount() {
        //request for doc details
        this.requestDocs(new Date());
        this.renderDocList()
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <Typography variant="h4" color="inherit" className={this.props.classes.title}>预约挂号</Typography>
                <Grid container spacing={3}>
                    <Grid container item xs={12}>
                        <Grid item xs={2}>
                            <TextField id="filled-basic" label="搜索医生姓名" variant="filled" inputProps={{maxLength: 6}}/>
                        </Grid>
                        <Grid item xs={1}>
                            <div className={this.props.classes.searchButton} onClick={()=>console.log(0)}>
                                <svg viewBox="0 0 1024 1024" width="30"
                                     height="30">
                                    <path
                                        d="M836.48 496A340.48 340.48 0 1 0 496 836.48 340.8 340.8 0 0 0 836.48 496z m75.52 0a416 416 0 1 1-416-416 416 416 0 0 1 416 416z"
                                        fill="#808080"/>
                                    <path d="M761.28 806.72a32 32 0 0 1 45.44-45.44l128 128a32 32 0 0 1-45.44 45.44z"
                                          fill="#808080"/>
                                </svg>
                            </div>
                        </Grid>
                        <Grid item xs={9}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="选择就诊日期"
                                    value={this.date}
                                    onChange={(d) => {
                                        if (d) {
                                            this.date = d
                                            this.handleDateChange();
                                        }
                                    }}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={3}>
                            <ButtonGroup
                                orientation="vertical"
                                color="primary"
                                aria-label="vertical contained primary button group"
                                variant="text"
                            >
                                <Button>One</Button>
                                <Button>Two</Button>
                                <Button>Three</Button>

                            </ButtonGroup>
                        </Grid>
                        <Grid container item xs={9}>
                            {this.renderDocList()}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default DocDetails;