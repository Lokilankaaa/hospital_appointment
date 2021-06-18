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

interface UserInfoProps {
    Name: string;
    Gender: string;
    ID: string;
    IDValidDateFrom: string;
    IDValidDateTo: string;
    Nationality: string;
    PhoneNumber: string;
    Passsword: string
}

interface UserPasswordProps {
    OldPassword: string;
    NewPassword: string;
    ConfoirmPassword: string;
}

enum InfoTypes {
    Info,
    ChangePassword,
    Patients,
    Appointments,
    Focus
}

@observer
class UserInfo extends React.Component<SignUpProps, {}> {

    @observable private user: UserInfoProps = {
        Name : " ",
        Gender : "男/女",
        ID : " ",
        IDValidDateFrom : " ",
        IDValidDateTo : " ",
        Nationality : " ",
        PhoneNumber : " ",
        Passsword : " "
    }
    @observable private userChangePassword: UserPasswordProps = {
        OldPassword: "",
        NewPassword : "",
        ConfoirmPassword : "",
    }

    @observable private selectType: InfoTypes = InfoTypes.Info;
    
    private renderTabs = new Map([
        [InfoTypes.Info, () => this.renderInfo()],
        [InfoTypes.ChangePassword, () => this.renderChangePassword()],
        [InfoTypes.Patients, () => this.renderPatients()],
        [InfoTypes.Appointments, () => this.renderAppointments()],
        [InfoTypes.Focus, () => this.renderFocus()]
    ]);



    constructor(props: SignUpProps) {
        super(props);
        makeObservable(this);
    }
    private getButtonTextClass = (infoType: InfoTypes) =>
        { return `${this.props.classes.sideBarButton} ${this.selectType === infoType ? this.props.classes.buttonActive : '' }`;}
    
    infoTitles = [
        {Name: "基本信息"},

        {Name: "*姓名",
        textBox: (<TextField fullWidth  variant="outlined" id="userinfo.Name" defaultValue={ this.user.Name }
        onChange={(data) => { this.user.Name = data.target.value } }/>)}, 

        {Name: "*性别",
        textBox: (<TextField fullWidth  id="userinfo.Gender" variant="outlined" defaultValue={ this.user.Gender } 
                                    onChange={(data) => { this.user.Gender = data.target.value } }/>)}, 

        {Name: "*身份证号码",
        textBox: ( <TextField fullWidth  id="userinfo.ID" variant="outlined" defaultValue={ this.user.ID } 
                                    onChange={(data) => { this.user.ID = data.target.value } }/>)}, 

        {Name: "*身份证有效期",
        textBox: (<Box display="flex" p={0}>
                    <TextField fullWidth  id="userinfo.IDValidDateFrom" variant="outlined" defaultValue={ this.user.IDValidDateFrom }
                        onChange={(data) => { this.user.IDValidDateFrom = data.target.value } }/>
                    <TextField  disabled id="userinfo.IDValidDateFrom" variant="outlined" defaultValue={ "至" }/>
                    <TextField fullWidth  id="userinfo.IDValidDateTo" variant="outlined" defaultValue={ this.user.IDValidDateTo }
                        onChange={(data) => { this.user.IDValidDateTo = data.target.value } }/>
                    </Box>)},  

        {Name: "*民族",
        textBox: (<TextField fullWidth  variant="outlined" id="userinfo.Nationality" defaultValue={ this.user.Nationality } 
        onChange={(data) => { this.user.Name = data.target.value } }/>)},

        {Name: "联系方式"},

        {Name: "*手机号码", 
        textBox: (<TextField fullWidth  variant="outlined" id="userinfo.PhoneNumber" defaultValue={ this.user.PhoneNumber } 
        onChange={(data) => { this.user.Name = data.target.value } }/>)}
    ];

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

    private changePassword = () => {
        if(this.user.Passsword === this.userChangePassword.OldPassword) {
            this.user.Passsword = this.userChangePassword.OldPassword;
            console.log("Change successfully!")
        } else {
            console.log("Change Failed?!")
        }
    }

    private passwordValid = () => {
        return  this.userChangePassword.NewPassword === this.userChangePassword.ConfoirmPassword
    }

    private renderInfo() {
        return (
            <div style={{margin:"0%"}}>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Container maxWidth="xl" component="main" style={{marginTop:"0%"}}>
                        {this.infoTitles.map((title) => (
                            <Grid container>
                                <div style={{margin:"1%", height: "20%", width:"20%"}}>
                                    <Box display="flex" p={0} width="100%">
                                        <Box p={0} width="100%"></Box>
                                        <Box p={0} flexShrink={0}>
                                            <h3 style={{width:"100%"}}> {title.Name + ":"} </h3>
                                        </Box>
                                    </Box> 
                                </div>
                                <div style={{marginTop:"1.5%", marginLeft:"3%", height: "20%", width:"75%"}}>
                                    { title.textBox }
                                </div>
                            </Grid>

                        ))}
                    </Container>
                </form>
            </div>
        )
    }
    private renderSideBar() {
        return(
            <div style={{marginLeft:"5%"}}>
                <Grid container>
                <h3 style={{width:"100%"}}>用户管理信息</h3>
                    <Grid item>
                        <Grid item>
                            <MenuList 
                             style={{width:"100%"}} >
                                <MenuItem onClick={ () => { this.selectType = InfoTypes.Info }} className={ this.getButtonTextClass(InfoTypes.Info) }>
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

    private renderChangePassword() {
        return(
            <Grid style={ {justifyContent: 'center'} }>
                <form onSubmit={(e) => e.preventDefault()}>
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
            <Grid container>
                <Grid item style={{marginTop:"3%", height: "20%", width:"15%"}}>
                <div style={{marginLeft:"20%", marginTop:"100%", height: "20%", width:"100%"}}>
                    { this.renderSideBar() }
                </div>
                    
                </Grid>
                <Grid item style={{marginTop:"3%", height: "20%", width:"75%"}}>
                    <div className={ this.props.classes.header } >
           
                            <Typography variant={"h5"} className={ this.props.classes.innerTitle }>{"个人信息"}</Typography>
                              
                      
                    </div>


                    { this.getRenderTabs() }

                </Grid>
            </Grid>
        )
    }
}
export default UserInfo