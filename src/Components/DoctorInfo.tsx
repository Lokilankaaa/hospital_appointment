import * as React from "react";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import { observable, makeObservable } from "mobx";
import { observer } from "mobx-react";
import { SignUpProps } from '../Models/Login';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import history from '../Helpers/History';
import { getLookup } from "../Helpers/Routers";
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import WelcomeHeader from "./welcomeHeader";
import { requestManager } from "../Helpers/RequestManager";
import { DoctorInfoProps, DoctorPasswordProps, InfoTypes } from "../Models/DoctorInfo";
import OperationStateManager from "../Helpers/OperationStateManager"
import { OperationStates, OPerationStatus } from '../Models/OperationState'
import Alert from '@material-ui/lab/Alert';

@observer
class DoctorInfo extends React.Component<SignUpProps, {}> {
    @observable private doctor: DoctorInfoProps = {
        classes: {},
        Name: "",
        Birthday: "",
        DID_Number: "",
        Gender: "",
        Rank: "",
        Depart: "",
        Info: "",
    }

    @observable private doctorChangePassword: DoctorPasswordProps = {
        OldPassword: "",
        NewPassword: "",
        ConfoirmPassword: "",
    }

    @observable private selectType: InfoTypes = InfoTypes.Info;
    public ChangePassswordStateCallBack = (state: OperationStates, msg: string) => {
        this.ChangePassswordStatus.state = state;
        this.ChangePassswordStatus.msg = msg;
        console.log(msg, this.ChangePassswordStatus.msg)
    }

    private ChangePassswordStatusManager = new OperationStateManager(this.ChangePassswordStateCallBack);
    @observable ChangePassswordStatus: OPerationStatus = {
        state: OperationStates.NotTriggered,
        msg: ""
    };


    public ChangeInfoStateCallBack = (state: OperationStates, msg: string) => {
        this.ChangeInfoStatus.state = state;
        this.ChangeInfoStatus.msg = msg;
        console.log(msg, this.ChangeInfoStatus.msg)
    }

    private ChangeInfoStatusManager = new OperationStateManager(this.ChangeInfoStateCallBack);
    @observable ChangeInfoStatus: OPerationStatus = {
        state: OperationStates.NotTriggered,
        msg: ""
    };

    @observable ConfirmPassswordStatus: OPerationStatus = {
        state: OperationStates.NotTriggered,
        msg: ""
    };

    private renderTabs = new Map([
        [InfoTypes.Info, () => this.renderInfo()],
        [InfoTypes.ChangePassword, () => this.renderChangePassword()],
        [InfoTypes.Patients, () => this.renderPatients()],
        [InfoTypes.Appointments, () => this.renderAppointments()],
        [InfoTypes.Focus, () => this.renderFocus()]
    ]);

    private getDoctorCallBack = (data: any) => {
        this.doctor = {
            classes: {},
            Name: data['name'],
            Birthday: data['birthday'],
            Gender: data['gender'],
            Rank: data['rankk'],
            DID_Number: "",
            Depart: data['depart'],
            Info: data['info'],
        }
    }

    constructor(props: SignUpProps) {
        super(props);
        makeObservable(this);
        requestManager.doctor_getinfo(this.getDoctorCallBack)
    }

    componentDidMount() {
        requestManager.doctor_getinfo(this.getDoctorCallBack)
    }

    private getButtonTextClass = (infoType: InfoTypes) => { return `${this.props.classes.sideBarButton} ${this.selectType === infoType ? this.props.classes.buttonActive : ''}`; }

    passWordsTab = [
        {
            title: "?????????",
            hint: "?????????????????????",
            onChange: (data: React.ChangeEvent<HTMLInputElement>) => { this.doctorChangePassword.OldPassword = data.target.value }
        },
        {
            title: "?????????",
            hint: "??????????????????",
            onChange: (data: React.ChangeEvent<HTMLInputElement>) => { this.doctorChangePassword.NewPassword = data.target.value }
        },
        {
            title: "????????????",
            hint: "???????????????????????????",
            onChange: (data: React.ChangeEvent<HTMLInputElement>) => { this.doctorChangePassword.ConfoirmPassword = data.target.value }
        }
    ]

    private passwordValid = () => {
        if (this.doctorChangePassword.NewPassword === this.doctorChangePassword.ConfoirmPassword) {
            this.ConfirmPassswordStatus.state = OperationStates.NotTriggered
        }
        else {
            this.ConfirmPassswordStatus.state = OperationStates.Failed;
            this.ConfirmPassswordStatus.msg = '??????????????????????????????';
        }
        return this.doctorChangePassword.NewPassword === this.doctorChangePassword.ConfoirmPassword
    }

    private changeInfo = () => {
        requestManager.doctor_changeDoctorInfo(this.doctor, this.ChangeInfoStatusManager)
    }


    private renderInfo() {
        const info = this.doctor
        const msg = this.ChangeInfoStatus.msg;
        return (
            <div style={{ marginBottom: "2%" }}>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Grid container style={{ display: "flex", justifyContent: "center" }}>
                                <Grid item xs={2} style={{ height: "20%", width: "20%", display: "flex", justifyContent: "flex-end" }}>
                                    <h3 style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}> {'????????????'} </h3>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container style={{ display: "flex", justifyContent: "center" }}>
                                <Grid item xs={2} style={{ height: "20%", width: "20%", display: "flex", justifyContent: "flex-end" }}>
                                    <h3 style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}> {'*??????'}: </h3>
                                </Grid>
                                <Grid color="primary" item xs={8} style={{ marginTop: "1.5%", marginLeft: "3%", height: "20%", width: "75%", color: "black" }}>
                                    <TextField disabled fullWidth variant="outlined" id={"userinfo" + '*??????'} value={info.Name}
                                        onChange={(data) => { this.doctor.Name = data.target.value }} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container style={{ display: "flex", justifyContent: "center" }}>
                                <Grid item xs={2} style={{ height: "20%", width: "20%", display: "flex", justifyContent: "flex-end" }}>
                                    <h3 style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}> {'*??????'}: </h3>
                                </Grid>
                                <Grid item xs={8} style={{ marginTop: "1.5%", marginLeft: "3%", height: "20%", width: "75%" }}>
                                    <TextField fullWidth variant="outlined" id={"userinfo" + '*??????'} value={info.Birthday}
                                        onChange={(data) => { this.doctor.Birthday = data.target.value }} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container style={{ display: "flex", justifyContent: "center" }}>
                                <Grid item xs={2} style={{ height: "20%", width: "20%", display: "flex", justifyContent: "flex-end" }}>
                                    <h3 style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}> {'*??????'}: </h3>
                                </Grid>
                                <Grid item xs={8} style={{ marginTop: "1.5%", marginLeft: "3%", height: "20%", width: "75%" }}>
                                    <TextField fullWidth variant="outlined" id={"userinfo" + '*??????'} value={info.Gender}
                                        onChange={(data) => { this.doctor.Gender = data.target.value }} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container style={{ display: "flex", justifyContent: "center" }}>
                                <Grid item xs={2} style={{ height: "20%", width: "20%", display: "flex", justifyContent: "flex-end" }}>
                                    <h3 style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}> {'*??????'}: </h3>
                                </Grid>
                                <Grid color="primary" item xs={8} style={{ marginTop: "1.5%", marginLeft: "3%", height: "20%", width: "75%", color: "black" }}>
                                    <TextField fullWidth variant="outlined" id={"userinfo" + '*??????'} value={info.Rank}
                                        onChange={(data) => { this.doctor.Rank = data.target.value }} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container style={{ display: "flex", justifyContent: "center" }}>
                                <Grid item xs={2} style={{ height: "20%", width: "20%", display: "flex", justifyContent: "flex-end" }}>
                                    <h3 style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}> {'*??????'} </h3>
                                </Grid>
                                <Grid item xs={8} style={{ marginTop: "1.5%", marginLeft: "3%", height: "20%", width: "75%" }}>
                                    <TextField fullWidth variant="outlined" id={"userinfo" + '*??????'} value={info.Depart}
                                        onChange={(data) => { this.doctor.Depart = data.target.value }} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container style={{ display: "flex", justifyContent: "center" }}>
                                <Grid item xs={2} style={{ height: "20%", width: "20%", display: "flex", justifyContent: "flex-end" }}>
                                    <h3 style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}> {'*????????????'} </h3>
                                </Grid>
                                <Grid item xs={8} style={{ marginTop: "1.5%", marginLeft: "3%", height: "20%", width: "75%", color: "black" }}>
                                    <TextField fullWidth variant="outlined" id={"userinfo" + '*????????????'} value={info.Info}
                                        onChange={(data) => { this.doctor.Info = data.target.value }} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
                <Button type="submit" className={this.props.classes.ConfirmPasswordButton}
                    onClick={this.changeInfo} style={{ width: "20%" }} >
                    {"????????????"}
                </Button>

                {this.renderAlert(this.ChangeInfoStatus.state, msg, "????????????")}

            </div>
        )
    }

    private onClickSideBarInfo = () => {
        this.selectType = InfoTypes.Info
        requestManager.doctor_getinfo(this.getDoctorCallBack)

    }

    private renderSideBar() {
        return (
            <div style={{ marginLeft: "5%" }}>
                <Grid container style={{ display: "flex", justifyContent: "center" }}>
                    <h3 style={{ width: "100%" }}>??????????????????</h3>
                    <Grid item>
                        <Grid item>
                            <MenuList
                                style={{ width: "100%" }} >
                                <MenuItem onClick={this.onClickSideBarInfo} className={this.getButtonTextClass(InfoTypes.Info)}>
                                    {"????????????"}
                                </MenuItem>
                                <MenuItem onClick={() => { this.selectType = InfoTypes.ChangePassword }} className={this.getButtonTextClass(InfoTypes.ChangePassword)}>
                                    {"????????????"}
                                </MenuItem>
                            </MenuList>
                        </Grid>

                        <Grid item>
                            <Button type="submit" className={this.getButtonTextClass(InfoTypes.Patients)}
                                onClick={() => { this.selectType = InfoTypes.Patients }} style={{ width: "100%" }} >
                                {"???????????????"}
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button type="submit" className={this.getButtonTextClass(InfoTypes.Appointments)}
                                onClick={() => { this.selectType = InfoTypes.Appointments }} style={{ width: "100%" }} >
                                {"????????????"}
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button type="submit" className={this.getButtonTextClass(InfoTypes.Focus)}
                                onClick={() => { this.selectType = InfoTypes.Focus }} style={{ width: "100%" }} >
                                {"????????????"}

                            </Button>
                        </Grid>

                    </Grid>
                </Grid>
            </div>
        )
    }


    private changePassword = () => {
        requestManager.doctor_changePassword(this.doctorChangePassword, this.ChangePassswordStatusManager)
    }

    renderAlert = (state: OperationStates, msg: string, msgBase: string) => {
        return new Map([
            [OperationStates.Successful, <Alert severity="success">{msgBase}??????!</Alert>],
            [OperationStates.Failed, <Alert severity="error"> {msgBase}?????????{msg}</Alert>],
            [OperationStates.Triggered, <Alert severity="info"> ??????{msgBase}....... </Alert>],
            [OperationStates.NotTriggered, <div />],
        ]).get(state);
    }

    private renderChangePassword() {
        const msg = this.ChangePassswordStatus.msg;
        const confirmErrMsg = this.ConfirmPassswordStatus.msg
        return (
            <Grid style={{ justifyContent: 'center', backgroundColor: '#f6f6f6' }}>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Container maxWidth="xl" component="main" style={{ marginTop: "5%" }}>
                        {this.passWordsTab.map((pass) => (
                            <Grid container>
                                <div style={{ margin: "1%", height: "20%", width: "20%" }}>
                                    <Box display="flex" p={0} width="100%">
                                        <Box p={0} width="100%"></Box>
                                        <Box p={0} flexShrink={0}>
                                            <h3 style={{ width: "100%" }}> {pass.title + ":"} </h3>
                                        </Box>
                                    </Box>
                                </div>
                                <div style={{ marginTop: "1.5%", marginLeft: "3%", height: "20%", width: "75%" }}>
                                    <TextField fullWidth id="doctorinfo.gender" variant="outlined" label={pass.hint} type="password"
                                        onChange={pass.onChange} />
                                </div>
                            </Grid>

                        ))}
                    </Container>
                </form>
                <Button type="submit" className={this.props.classes.ConfirmPasswordButton} disabled={!this.passwordValid()}
                    onClick={this.changePassword} style={{ width: "20%" }} >
                    {"??????"}

                </Button>
                {this.renderAlert(this.ConfirmPassswordStatus.state, confirmErrMsg, "????????????")}
                {this.renderAlert(this.ChangePassswordStatus.state, msg, "????????????")}
            </Grid>
        )
    }
    private renderPatients() {
        return (
            <div></div>
        )
    }
    private renderAppointments() {
        history.push(getLookup())
        return (
            <div></div>
        )
    }
    private renderFocus() {
        return (
            <div></div>
        )
    }

    private getRenderTabs() {
        let tab = this.renderTabs.get(this.selectType);
        if (tab) return tab();
        else return this.renderInfo();
    }
    render() {
        return (
            <div style={{ backgroundColor: '#f6f6f6' }}>
                <WelcomeHeader classes={this.props.headerClasses} />
                <Grid container>
                    <Grid item style={{ display: "flex", justifyContent: "center" }}>
                        {this.renderSideBar()}
                    </Grid>
                    <Grid item xs={9} style={{ marginTop: "3%", height: "20%", width: "75%" }}>
                        <div className={this.props.classes.header} >
                            <Grid container className={this.props.classes.innerTitle} item xs={2}>
                                <Typography variant={"h5"} className={this.props.classes.innerTitle} style={{ borderBottom: "4px solid RGB(70,167,12)", }}>{"????????????"}</Typography>
                            </Grid>

                        </div>


                        {this.getRenderTabs()}

                    </Grid>
                </Grid>
            </div>
        )
    }
}
export default DoctorInfo