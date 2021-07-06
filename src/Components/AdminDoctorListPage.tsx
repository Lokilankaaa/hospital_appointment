import * as React from "react";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {Lambda, observable, reaction, makeObservable} from "mobx";
import DateFnsUtils from '@date-io/date-fns';
import {inject, observer} from "mobx-react";
import Typography from '@material-ui/core/Typography';
import DetailCard from "./detailCard";
import {detailPageProps, detailProps} from "../Models/DocDetail";
import {requestManager} from "../Helpers/RequestManager";
import DocInfoCard from "./DocInfoCard";
import {Info} from "@material-ui/icons";

@observer
class AdminDoctorListPage extends React.Component<detailPageProps, {}> {
    @observable private date: Date;
    @observable private details: Array<detailProps>;
    @observable private types: Array<string>;
    @observable private currentType: string | null;
    @observable private searchDocName: string;

    constructor(props: detailPageProps) {
        super(props);
        makeObservable(this);
        this.handleDepartChange.bind(this);
        this.handleDateChange.bind(this);
        this.requestDocs.bind(this);
        this.renderDocList.bind(this);
        this.requestDocTypes.bind(this);
        this.requestSearch.bind(this);
        this.details = new Array<detailProps>();
        this.date = new Date();
        this.types = new Array<string>();
        this.currentType = "";
        this.searchDocName = "";
    }

    requestDocTypes(t: string | null) {
        if (!t) {
            // const a = ["中医肛肠科", "皮肤性病科", "小儿普外科", "消化内科", "血液病科", "神经内科", "耳鼻咽喉科", "小儿内科", "小儿骨科", "呼吸科"]
            // a.map((aa) => this.types.push(aa))
            requestManager.search_depart("", this.types);
        }
    }

    requestDocs(date: Date) {
        this.details = new Array<detailProps>();
        requestManager.search_docs(this.currentType === null ? this.types[0] : this.currentType, "", this.details, this.props.cardClasses);
    }

    requestSearch() {
        this.details = new Array<detailProps>();
        requestManager.search_docs(this.currentType === null ? this.types[0] : this.currentType, this.searchDocName, this.details, this.props.cardClasses);
    }

    handleDateChange() {
        //request for new doc details
        console.log(this.date);
        this.requestDocs(this.date);
    }

    handleDepartChange() {
        console.log(this.currentType);
        this.requestDocs(this.date);
    }

    renderButtonList() {
        if (this.types.length > 0) {
            return this.types.map((type) => (
                <Button
                    className={`${this.props.classes.buttonG} ${type === this.currentType ? this.props.classes.buttonActive : ''}`}
                    id={type} onClick={(e) => {
                    const el = e.target as HTMLInputElement;
                    this.currentType = el.getAttribute('id')
                }}>
                    <Typography id={type} onClick={(e) => {
                        const el = e.target as HTMLInputElement;
                        if (this.currentType !== el.getAttribute('id')) {
                            this.currentType = el.getAttribute('id')
                            this.requestDocTypes(this.currentType);
                        }

                    }}>{type}
                    </Typography>
                </Button>
            ))
        } else {
            return (<h2>No doctor found</h2>)
        }
    }

    renderDocList() {
        if (this.details.length > 0) {
            let morningDoc = this.details.filter((detail) => detail.isam).map((detail) => (
                    <Grid item xs={9} sm={3}>
                        <DocInfoCard classes={detail.classes} did={detail.did} docName={detail.docName} docTitle={detail.docTitle}
                                     rest={detail.rest} fee={detail.fee} docImg={detail.docImg}
                                     isam={detail.isam} capacity={detail.capacity} gender={detail.gender} tid={detail.tid}/>
                    </Grid>
                )
            );

            let afternoonDoc = this.details.filter((detail) => !detail.isam).map((detail) => (
                    <Grid item xs={9} sm={3}>
                        <DocInfoCard classes={detail.classes} did={detail.did} docName={detail.docName} docTitle={detail.docTitle}
                                     rest={detail.rest} fee={detail.fee} docImg={detail.docImg}
                                     isam={detail.isam} capacity={detail.capacity} gender={detail.gender} tid={detail.tid}/>
                    </Grid>
                )
            );
            morningDoc = morningDoc.length > 0 ? morningDoc : [(<Grid item xs={9} sm={9}><h2>No doctor found</h2></Grid>)];
            afternoonDoc = afternoonDoc.length > 0 ? afternoonDoc : [(<Grid item xs={9} sm={9}><h2>No doctor found</h2></Grid>)];
            return [morningDoc, afternoonDoc];
        } else
            return [(<Grid item xs={9} sm={9}><h2>No doctor found</h2></Grid>), (<Grid item xs={9} sm={9}><h2>No doctor found</h2></Grid>)];
    }

    componentDidMount() {
        //request for doc details
        this.requestDocTypes(null);
        this.currentType = this.types[0];
        this.requestDocs(this.date);
    }

    render() {
        return (
            <div>
                <div className={this.props.classes.root}>
                    <Typography variant="h4" color="inherit" className={this.props.classes.title}>医生信息</Typography>
                    <Grid container spacing={3}>
                        <Grid container item xs={12}>
                            <Grid item xs={2}>
                                <TextField id="filled-basic" label="搜索医生姓名" variant="filled" inputProps={{maxLength: 6}}
                                           onChange={(e) => this.searchDocName = e.target.value}/>
                            </Grid>
                            <Grid item xs={1}>
                                <div className={this.props.classes.searchButton} onClick={() => this.requestSearch()}>
                                    <svg viewBox="0 0 1024 1024" width="30"
                                         height="30">
                                        <path
                                            d="M836.48 496A340.48 340.48 0 1 0 496 836.48 340.8 340.8 0 0 0 836.48 496z m75.52 0a416 416 0 1 1-416-416 416 416 0 0 1 416 416z"
                                            fill="#808080"/>
                                        <path
                                            d="M761.28 806.72a32 32 0 0 1 45.44-45.44l128 128a32 32 0 0 1-45.44 45.44z"
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
                            <Grid item xs={2}>
                                <ButtonGroup
                                    orientation="vertical"
                                    color="primary"
                                    aria-label="vertical contained primary button group"
                                    variant="text"
                                    className={this.props.classes.buttonGroup}
                                >
                                    {this.renderButtonList()}

                                </ButtonGroup>
                            </Grid>
                            <Grid container item xs={10}>
                                <Grid item xs={10} sm={10}><Typography variant={"h4"}
                                                                       className={this.props.classes.innerTitle}>上午</Typography></Grid>
                                {this.renderDocList()[0]}
                                <Grid item xs={10} sm={10}><Typography variant={"h4"}
                                                                      className={this.props.classes.innerTitle}>下午</Typography></Grid>
                                {this.renderDocList()[1]}
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default AdminDoctorListPage;