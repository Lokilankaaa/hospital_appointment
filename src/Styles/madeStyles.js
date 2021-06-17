import { makeStyles } from "@material-ui/core/styles";

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
    width: "80%",
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

  image: {
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
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'auto',
    backgroundPosition: 'center 50%',
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