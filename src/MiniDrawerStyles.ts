import { makeStyles, Theme } from "@material-ui/core";

const drawerWidth = 240;

export const useMiniDrawerStyles = makeStyles((currentTheme: Theme) => ({
	root: {
	  display: 'flex',
	},
	appBar: {
	  zIndex: currentTheme.zIndex.drawer + 1,
	  transition: currentTheme.transitions.create(['width', 'margin'], {
		easing: currentTheme.transitions.easing.sharp,
		duration: currentTheme.transitions.duration.leavingScreen,
      }),
	},
	appBarShift: {
	  marginLeft: drawerWidth,
	  width: `calc(100% - ${drawerWidth}px)`,
	  transition: currentTheme.transitions.create(['width', 'margin'], {
		easing: currentTheme.transitions.easing.sharp,
		duration: currentTheme.transitions.duration.enteringScreen,
	  }),
	},
	menuButton: {
	  marginRight: 36,
	},
	hide: {
	  display: 'none',
	},
	drawer: {
	  width: drawerWidth,
	  flexShrink: 0,
      whiteSpace: 'nowrap',
	},
	drawerOpen: {
	  width: drawerWidth,
	  transition: currentTheme.transitions.create('width', {
		easing: currentTheme.transitions.easing.sharp,
		duration: currentTheme.transitions.duration.enteringScreen,
	  }),
	},
	drawerClose: {
	  transition: currentTheme.transitions.create('width', {
		easing: currentTheme.transitions.easing.sharp,
		duration: currentTheme.transitions.duration.leavingScreen,
	  }),
	  overflowX: 'hidden',
	  width: currentTheme.spacing(7) + 1,
	  [currentTheme.breakpoints.up('sm')]: {
		width: currentTheme.spacing(9) + 1,
	  },
	},
	toolbar: {
	  display: 'flex',
	  alignItems: 'center',
	  justifyContent: 'flex-end',
	  padding: currentTheme.spacing(0, 1),
	  // necessary for content to be below app bar
	  ...currentTheme.mixins.toolbar,
    },
    rightToolbar: {
        marginLeft: 'auto',
        marginRight: -12
    },
	content: {
	  flexGrow: 1,
	  padding: currentTheme.spacing(3),
    },
}));