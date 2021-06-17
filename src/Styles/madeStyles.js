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
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
      toolbar: {
        flexWrap: 'wrap',
      },
      toolbarTitle: {
        flexGrow: 1,
      },
      link: {
        margin: theme.spacing(1, 1.5),
      },
      heroContent: {
        padding: theme.spacing(8, 0, 6),
      },
      cardHeader: {
        backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
      },
      cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
      },
      footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
          paddingTop: theme.spacing(6),
          paddingBottom: theme.spacing(6),
        },
      },
}));


export const FrontStyles = makeStyles((theme) => ({
  backgroundImg: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 100,
    height: 800,
    width: "80%",
    alignItems: 'center',
    marginTop: theme.spacing(20),
    marginLeft: theme.spacing(20),
    marginRight: theme.spacing(20),
    backgroundColor: '#F8F8F8'

  },

  root: {
    display: 'flex',
    flexWrap: 'wrap',
    height: "80%",
    width: "100%",
    alignItems: 'center',
    backgroundColor: 'transparent', //transparent #0BDAA4
    marginTop: "1%",
    marginBottom: "5%",
    marginLeft: "5%",
    marginRight: "5%",
  },

  FrontText: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: 'transparent', //transparent #0BDA05
    width: "10%",
    marginTop: "0%",
  },

  image: {
    position: 'relative',
    height: 400,
    width: '23%',
    marginTop: "2%",
    marginRight: "1%",
    marginLeft: "1%",

    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.05,
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