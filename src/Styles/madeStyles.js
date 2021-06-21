import {makeStyles} from "@material-ui/core/styles";

export const recordClasses = makeStyles({
    root: {
        width: 'fit-content',
        '& hr': {
            margin: "1px",
        },
    },
    block: {

    }
})

export const recordsClasses = makeStyles({
        root: {

        }
    }
)

export const headerClasses = makeStyles({
    root: {
        position: "fixed",
        // padding: "0",
        height: "30px",
        // marginTop: "-9%",
        width: "100%",
        margin: "0",
        top: "0%",
        // backgroundColor: "#edf1ec",
        zIndex: 100,
        paddingTop: "1%",
        paddingBottom: "1%"
    },
    img: {
        marginLeft: "3%",
        // transform: "scale(0.3)",
        float: "left",
        // marginTop: "-8%",
        width: "30px",
    },
    title1: {
        display: "inline-block",
        fontSize: 20,
        float: "left",
        color: "#077921"
    },
    button: {
        float: "right",
        height: "30px",
        marginLeft: "3%",
        marginRight: "3%"
    },
    title2: {
        fontSize: 20,
        display: "inline-block",
        float: "right",
        alignItems: "center"
    },

})

export const cardClasses = makeStyles({
    root: {
        // minWidth: 275,
        margin: "3%"
    },
    title: {
        fontSize: 14,
    },
    pos: {},
});

export const detailPageClasses = makeStyles({
    root: {
        // margin: "3%",
        marginTop: "3%",
        padding: "3%",
        backgroundColor: "#f6f6f6"
    },
    title: {
        margin: "1%",
    },
    innerTitle: {
        margin: "1%",
        paddingLeft: "2%",
        borderLeft: "3px solid RGB(70,167,12)",
    },
    searchButton: {
        marginLeft: "-20%",
        marginTop: "12%",
        // float: "left",
        "&:hover": {
            cursor: "pointer"
        }
    },
    buttonG: {
        fontSize: 17,
        color: "RGB(0,0,0)",
        borderBottom: "1px solid RGB(70,167,12) !important",
    },
    buttonActive: {
        color: "#0BDAA4",
    },
    buttonGroup: {
        marginLeft: "10%",
    }
})

export const loginClasses = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    loginForm: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            height: '5ch',
            width: "100%",
        },
    },
    loginButton: {
        backgroundColor: "#28A745",
        color: "white",
        width: "100%",
        marginTop: "2%"
    },
    GetValidationButton: {
        backgroundColor: "#28A745",
        color: "white",
        marginTop: "2%"
    },
    paper: {
        padding: theme.spacing(0),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: "100%",
        height: '80%',
    },
}));

export const FrontStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 100,
        height: "100%",
        width: "100%",
        alignItems: 'center',

        backgroundColor: 'transparent', //transparent #0BDAA4
    },

    footTextBox: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 100,
        height: "100%",
        width: "80%",
        alignItems: 'center',
        marginTop: theme.spacing(2),
        marginLeft: "14%",
        marginRight: "14%",
    },

    footText: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 100,
        height: "100%",
        alignItems: 'center',
    },

    backgroundImg: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 100,
        height: "100%",
        width: "100%",
        alignItems: 'center',
        marginTop: theme.spacing(2),
        marginBottom: "1%",
        marginLeft: "10%",
        marginRight: "10%",
    },

    tabsRoot: {
        display: 'flex',
        flexWrap: 'wrap',
        height: "80%",
        width: "100%",
        alignItems: 'center',
        backgroundColor: 'transparent', //transparent #0BDAA4
        marginTop: "0%",
        marginBottom: "5%",
        marginLeft: "5%",
        marginRight: "5%",
    },

    FrontText: {
        display: 'flex',
        backgroundColor: 'transparent', //transparent #0BDA05
        width: 120,
    },

    ButonBase: {
        position: 'relative',
        height: 600,
        width: '23%',
        marginRight: "1%",
        marginLeft: "1%",
        backgroundColor: theme.palette.common.white, //transparent #0BDAA4

        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.00,
            },
            '& $imageTitle': {
                border: '4px solid transparent',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: "50%",
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#0BDAA4',
        opacity: 0.9,
        // marginTop: theme.spacing(10),
    },
    imageSrc: {
        width: '100%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.1,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
}));