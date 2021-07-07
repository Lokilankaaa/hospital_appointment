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
import UserInfo from './UserInfo'
import {UserInfoPageProps, UserInfoProps} from "../Models/UserInfo";
import UserInfoCard from "./UserInfoCard";
import {adminStateInfoManager} from "../Helpers/AdminStateInfoManager";
import history from "../Helpers/History";
import {getAdminLoginRoute} from "../Helpers/Routers";
import WelcomeHeader from "./welcomeHeader";

@observer
class AdminUserListPage extends React.Component<UserInfoPageProps, {}> {
    @observable private date: Date;
    @observable private details: Array<UserInfoProps>;
    @observable private types: Array<string>;
    @observable private currentType: string | null;
    @observable private searchDocName: string;

    constructor(props: UserInfoPageProps) {
        super(props);
        if(!adminStateInfoManager.isLogin()){
            alert("请先登录")
            history.push(getAdminLoginRoute())
        }
        makeObservable(this);
        // TODO: This should be replace by user API
        this.handleDepartChange.bind(this);
        this.handleDateChange.bind(this);
        this.requestDocs.bind(this);
        this.renderDocList.bind(this);
        this.requestDocTypes.bind(this);
        this.requestSearch.bind(this);
        this.details = new Array<UserInfoProps>();
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
        this.details = new Array<UserInfoProps>();
        requestManager.search_users(this.searchDocName, this.details, this.props.cardClasses);
        // requestManager.search_docs(this.currentType === null ? this.types[0] : this.currentType, "", this.details, this.props.cardClasses);
    }

    requestSearch() {
        this.details = new Array<UserInfoProps>();
        requestManager.search_users(this.searchDocName, this.details, this.props.cardClasses);
        // requestManager.search_docs(this.currentType === null ? this.types[0] : this.currentType, this.searchDocName, this.details, this.props.cardClasses);
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

    renderDocList() {
        if (this.details.length > 0) {
            let morningDoc = this.details.map((detail) => (
                    <Grid item xs={9} sm={3}>
                        <UserInfoCard classes={detail.classes} Name={detail.Name} Gender={detail.Gender} ID_Number={detail.ID_Number}
                                     Birthday={detail.Birthday} PhoneNumber={detail.PhoneNumber}/>
                    </Grid>
                )
            );

            morningDoc = morningDoc.length > 0 ? morningDoc : [(<Grid item xs={9} sm={9}><h2>No user found</h2></Grid>)];
            return [morningDoc];
        } else
            return [(<Grid item xs={9} sm={9}><h2>No user found</h2></Grid>), (<Grid item xs={9} sm={9}><h2>No user found</h2></Grid>)];
    }

    componentDidMount() {
        //request for user details
        this.requestDocTypes(null);
        this.currentType = this.types[0];
        this.requestDocs(this.date);
    }

    render() {
        return (
            <div>
                <div className={this.props.classes.root}>
                    <WelcomeHeader classes={this.props.headerClasses}/>
                    <Typography variant="h4" color="inherit" className={this.props.classes.title}>用户信息</Typography>
                    <Grid container spacing={3}>
                        <Grid container item xs={12}>
                            <Grid item xs={2}>
                                <TextField id="filled-basic" label="搜索用户姓名" variant="filled" inputProps={{maxLength: 6}}
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

                                </ButtonGroup>
                            </Grid>
                            <Grid container item xs={10}>
                                <Grid item xs={10} sm={10}><Typography variant={"h4"}
                                                                       className={this.props.classes.innerTitle}>匹配用户</Typography></Grid>
                                {this.renderDocList()[0]}

                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default AdminUserListPage;