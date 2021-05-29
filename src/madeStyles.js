import {makeStyles} from "@material-ui/core/styles";

export const naviClasses = makeStyles(() => {

})

export const loginClasses = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    loginForm: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));