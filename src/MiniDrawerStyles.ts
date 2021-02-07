import { makeStyles, Theme } from "@material-ui/core";

const drawerWidth = 168;

export const useMiniDrawerStyles = makeStyles((theme: Theme) => ({
	root: {
	  display: 'flex',
	},
	appBar: {
	  zIndex: theme.zIndex.drawer + 1,
	  transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
      }),
	},
	appBarShift: {
	  marginLeft: drawerWidth,
	  width: `calc(100% - ${drawerWidth}px)`,
	  transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	  }),
	},
	menuButton: {
	  marginRight: 16,
	  marginLeft: '-8px',
	  padding: 0
	},
	hide: {
	  display: 'none',
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
			whiteSpace: 'nowrap',
		},
	},
	drawerOpen: {
	  width: drawerWidth,
	  transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	  }),
	},
	drawerClose: {
	  transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	  }),
	  overflowX: 'hidden',
	  [theme.breakpoints.up('sm')]: {
		width: theme.spacing(7) + 1,
	  },
	},
	toolbar: {
	  display: 'flex',
	  alignItems: 'center',
	  justifyContent: 'flex-end',
	  padding: theme.spacing(0, 1),
	  // necessary for content to be below app bar
	  ...theme.mixins.toolbar,
    },
    rightToolbar: {
        marginLeft: 'auto',
        marginRight: -12
    },
	content: {
	  flexGrow: 1,
	  padding: theme.spacing(3),
	  [theme.breakpoints.down('sm')]: {
		width: theme.spacing(7) + 1,
	  },
	},
	drawerIcon: {
		minWidth: 0,
		paddingRight: 16
	},
}));