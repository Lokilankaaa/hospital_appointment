import * as React from "react";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import hosLogo from '../Assets/hoslogo.svg'
import login from '../Assets/login.png'
import lookup from '../Assets/lookup.png'
import more from '../Assets/more.png'
import Register from '../Assets/Register.png'
import { Lambda, observable, reaction, makeObservable } from "mobx";
import { inject, observer } from "mobx-react";
import { SignUpProps } from '../Models/Login';
import TextField from '@material-ui/core/TextField';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import history from '../Helpers/History';
import { getLoginRoute, getSignUpRoute, getLookup } from "../Helpers/Routers";
import moment from "moment";
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import WelcomeHeader from "./welcomeHeader";
import { requestManager } from "../Helpers/RequestManager";
import { UserInfoProps, UserPasswordProps, InfoTypes } from "../Models/UserInfo"
import  OperationStateManager  from "../Helpers/OperationStateManager"
import { OperationStates, OPerationStatus } from '../Models/OperationState'
import Alert from '@material-ui/lab/Alert';

@observer
class UserInfo extends React.Component<SignUpProps, {}> {

    @observable private user: UserInfoProps = {
        classes : {},
        Name : " ",
        Gender : "",
        ID_Number : " ",
        Birthday: " ",
        PhoneNumber : " ",
    }
    @observable private userChangePassword: UserPasswordProps = {
        OldPassword: "",
        NewPassword : "",
        ConfoirmPassword : "",
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

    private getUserCallBack = (data: any) => {
        this.user = {
            Name : data['name'],
            Gender : data['gender'],
            ID_Number : data['id_number'],
            Birthday : data['birthday'],
            PhoneNumber : data['telephone'],
        }
    }

    constructor(props: SignUpProps) {
        super(props);
        makeObservable(this);
        requestManager.user_getinfo(this.getUserCallBack)
    }

    componentDidMount() {
   
        requestManager.user_getinfo(this.getUserCallBack)
    }

    private getButtonTextClass = (infoType: InfoTypes) =>
        { return `${this.props.classes.sideBarButton} ${this.selectType === infoType ? this.props.classes.buttonActive : '' }`;}

    passWordsTab = [
        {
            title: "原密码",
            hint:  "请输入原始密码",
            onChange: (data: React.ChangeEvent<HTMLInputElement>) => { this.userChangePassword.OldPassword = data.target.value }
        },
        {
            title: "新密码",
            hint:  "请输入新密码",
            onChange: (data: React.ChangeEvent<HTMLInputElement>) => { this.userChangePassword.NewPassword = data.target.value }
        },
        {
            title: "确认密码",
            hint:  "请在再次输入新密码",
            onChange: (data: React.ChangeEvent<HTMLInputElement>) => { this.userChangePassword.ConfoirmPassword = data.target.value }
        }
    ]

    private passwordValid = () => {
        if(this.userChangePassword.NewPassword === this.userChangePassword.ConfoirmPassword) {
            this.ConfirmPassswordStatus.state = OperationStates.NotTriggered
        }
        else {
            this.ConfirmPassswordStatus.state = OperationStates.Failed;
            this.ConfirmPassswordStatus.msg = '两次输入的密码不一致';
        }
        return  this.userChangePassword.NewPassword === this.userChangePassword.ConfoirmPassword
    }

    private changeInfo = () => {
        requestManager.user_changeUserInfo(this.user, this.ChangeInfoStatusManager)
    }


    private renderInfo() {
        const info = this.user
        const msg = this.ChangeInfoStatus.msg;
        return (
            <div style={{marginBottom:"2%"}}>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Grid container style={{display:"flex", justifyContent:"center"}}>
                                <Grid item xs={2} style={{height: "20%", width:"20%", display:"flex", justifyContent:"flex-end"}}>
                                        <h3 style={{width:"100%", display:"flex", justifyContent:"flex-end"}}> {'基本信息'} </h3>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container style={{display:"flex", justifyContent:"center"}}>
                                <Grid item xs={2} style={{height: "20%", width:"20%", display:"flex", justifyContent:"flex-end"}}>
                                        <h3 style={{width:"100%", display:"flex", justifyContent:"flex-end"}}> {'*姓名'}: </h3>
                                </Grid>
                                <Grid color="primary" item xs={8} style={{marginTop:"1.5%", marginLeft:"3%", height: "20%", width:"75%", color:"black"}}>
                                    <TextField disabled fullWidth variant="outlined" id={ "userinfo" + '*姓名' } value={ info.Name }
                                             onChange={(data) => { this.user.Name = data.target.value } }/> 
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container style={{display:"flex", justifyContent:"center"}}>
                                <Grid item xs={2} style={{height: "20%", width:"20%", display:"flex", justifyContent:"flex-end"}}>
                                        <h3 style={{width:"100%", display:"flex", justifyContent:"flex-end"}}> {'*性别'}: </h3>
                                </Grid>
                                <Grid item xs={8} style={{marginTop:"1.5%", marginLeft:"3%", height: "20%", width:"75%"}}>
                                    <TextField fullWidth variant="outlined" id={ "userinfo" + '*性别' } value={ info.Gender }
                                             onChange={(data) => { this.user.Gender = data.target.value } }/> 
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container style={{display:"flex", justifyContent:"center"}}>
                                <Grid item xs={2} style={{height: "20%", width:"20%", display:"flex", justifyContent:"flex-end"}}>
                                        <h3 style={{width:"100%", display:"flex", justifyContent:"flex-end"}}> {'*身份证号码'}: </h3>
                                </Grid>
                                <Grid item xs={8} style={{marginTop:"1.5%", marginLeft:"3%", height: "20%", width:"75%"}}>
                                    <TextField fullWidth variant="outlined" id={ "userinfo" + '*身份证号码' } value={ info.ID_Number }
                                             onChange={(data) => { this.user.ID_Number = data.target.value } }/> 
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container style={{display:"flex", justifyContent:"center"}}>
                                <Grid item xs={2} style={{height: "20%", width:"20%", display:"flex", justifyContent:"flex-end"}}>
                                        <h3 style={{width:"100%", display:"flex", justifyContent:"flex-end"}}> {'*生日'} </h3>
                                </Grid>
                                <Grid item xs={8} style={{marginTop:"1.5%", marginLeft:"3%", height: "20%", width:"75%"}}>
                                    <TextField fullWidth variant="outlined" id={ "userinfo" + '*生日' } value={ info.Birthday }
                                             onChange={(data) => { this.user.Birthday = data.target.value } }/> 
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container style={{display:"flex", justifyContent:"center"}}>
                                <Grid item xs={2} style={{height: "20%", width:"20%", display:"flex", justifyContent:"flex-end"}}>
                                        <h3 style={{width:"100%", display:"flex", justifyContent:"flex-end"}}> {'联系方式'} </h3>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container style={{display:"flex", justifyContent:"center"}}>
                                <Grid item xs={2} style={{height: "20%", width:"20%", display:"flex", justifyContent:"flex-end"}}>
                                        <h3 style={{width:"100%", display:"flex", justifyContent:"flex-end"}}> {'*手机号码'} </h3>
                                </Grid>
                                <Grid item xs={8} style={{marginTop:"1.5%", marginLeft:"3%", height: "20%", width:"75%", color:"black"}}>
                                    <TextField fullWidth variant="outlined" id={ "userinfo" + '*手机号码' } value={ info.PhoneNumber }
                                             onChange={(data) => { this.user.PhoneNumber = data.target.value } }/> 
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
                <Button type="submit" className={ this.props.classes.ConfirmPasswordButton }
                            onClick={ this.changeInfo } style={{width:"20%"}} >
                                    {"更新信息"}
                </Button>

                { this.renderAlert(this.ChangeInfoStatus.state, msg, "更新信息") }

            </div>
        )
    }

    private onClickSideBarInfo = () => {
        this.selectType = InfoTypes.Info
        requestManager.user_getinfo(this.getUserCallBack)
        
    }

    private renderSideBar() {
        return(
            <div style={{marginLeft:"5%"}}>
                <Grid container style={{display: "flex", justifyContent: "center"}}>
                <h3 style={{width:"100%"}}>用户管理信息</h3>
                    <Grid item>
                        <Grid item>
                            <MenuList 
                             style={{width:"100%"}} >
                                <MenuItem onClick={ this.onClickSideBarInfo } className={ this.getButtonTextClass(InfoTypes.Info) }>
                                        {"个人信息"}
                                </MenuItem>
                                <MenuItem onClick={ () => { this.selectType = InfoTypes.ChangePassword }} className={ this.getButtonTextClass(InfoTypes.ChangePassword) }>
                                        {"修改密码"}
                                </MenuItem> 
                            </MenuList>
                        </Grid>

                        <Grid item> 
                            <Button type="submit" className={ this.getButtonTextClass(InfoTypes.Patients) }
                            onClick={ () => { this.selectType = InfoTypes.Patients } } style={{ width:"100%" }} >
                                {"常用就诊人"}
                            </Button>
                        </Grid>

                        <Grid item> 
                            <Button type="submit" className={ this.getButtonTextClass(InfoTypes.Appointments) } 
                            onClick={ () => { this.selectType = InfoTypes.Appointments } } style={{width:"100%"}} >
                                    {"我的预约"}
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button type="submit" className={ this.getButtonTextClass(InfoTypes.Focus) } 
                            onClick={ () => { this.selectType = InfoTypes.Focus } } style={{width:"100%"}} >
                                    {"我的关注"}
                                    
                            </Button>
                        </Grid>

                    </Grid>
                </Grid>
            </div>
        )
    }

    
    private changePassword = () => {
        requestManager.user_changePassword(this.userChangePassword, this.ChangePassswordStatusManager)
    }

    renderAlert = (state: OperationStates, msg: string, msgBase: string) => {
        return new Map([
        [OperationStates.Successful, <Alert severity="success">{ msgBase }成功!</Alert> ],
        [OperationStates.Failed, <Alert severity="error"> { msgBase }失败：{ msg }</Alert>],
        [OperationStates.Triggered, <Alert severity="info"> 正在{ msgBase }....... </Alert>],
        [OperationStates.NotTriggered, <div />],
    ]).get(state);
    }

    private renderChangePassword() {
        const msg = this.ChangePassswordStatus.msg;
        const confirmErrMsg = this.ConfirmPassswordStatus.msg
        return(
            <Grid style={ {justifyContent: 'center', backgroundColor: '#f6f6f6'} }>
                <form onSubmit={(e) => e.preventDefault() }>
                    <Container maxWidth="xl" component="main" style={{marginTop:"5%"}}>
                        {this.passWordsTab.map((pass) => (
                            <Grid container>
                                <div style={{margin:"1%", height: "20%", width:"20%"}}>
                                    <Box display="flex" p={0} width="100%">
                                        <Box p={0} width="100%"></Box>
                                        <Box p={0} flexShrink={0}>
                                            <h3 style={{width:"100%"}}> {pass.title + ":"} </h3>
                                        </Box>
                                    </Box> 
                                </div>
                                <div style={{marginTop:"1.5%", marginLeft:"3%", height: "20%", width:"75%"}}>
                                    <TextField fullWidth  id="userinfo.Gender" variant="outlined" label={ pass.hint }  type="password"
                                        onChange={ pass.onChange }/>
                                </div>
                            </Grid>

                        ))}
                    </Container>
                </form>
                <Button type="submit" className={ this.props.classes.ConfirmPasswordButton } disabled={!this.passwordValid()}
                            onClick={ this.changePassword } style={{width:"20%"}} >
                                    {"修改"}
                                    
                </Button>
                { this.renderAlert(this.ConfirmPassswordStatus.state, confirmErrMsg, "输入密码") }
                { this.renderAlert(this.ChangePassswordStatus.state, msg, "修改密码") }
            </Grid>
        )
    }
    private renderPatients() {
        return(
            <div></div>
        )
    }
    private renderAppointments() {
        history.push(getLookup())
        return(
            <div></div>
        )
    }
    private renderFocus() {
        return(
            <div></div>
        )
    }

    private getRenderTabs() {
        let tab = this.renderTabs.get(this.selectType);
        if(tab) return tab();
        else return this.renderInfo();
    }
    render() {
        return (
            <div style={{backgroundColor: '#f6f6f6'}}>
                <WelcomeHeader classes={this.props.headerClasses}/>
                <Grid container>
                    <Grid item style={{display: "flex", justifyContent: "center"}}>
                            { this.renderSideBar() }
                    </Grid>
                    <Grid item xs={9} style={{marginTop:"3%", height: "20%", width:"75%"}}>
                        <div className={ this.props.classes.header } >
                            <Grid container className={ this.props.classes.innerTitle } item xs={2}>
                                <Typography variant={"h5"} className={ this.props.classes.innerTitle } style={{borderBottom: "4px solid RGB(70,167,12)",}}>{"用户详情"}</Typography>
                            </Grid>
                           
                        </div>


                        { this.getRenderTabs() }

                    </Grid>
                </Grid>
            </div>
        )
    }
}
export default UserInfo