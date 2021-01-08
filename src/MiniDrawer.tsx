import React from 'react';
// import './App.css';
import { Header } from "./Header";
import {
    ClickAwayListener,
	FormControlLabel,
	FormGroup,
	Switch as MuiSwitch,
    Typography
} from '@material-ui/core';
import {
	AppBar,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Toolbar,
} from '@material-ui/core';
import {
    createMuiTheme,
    makeStyles,
    ThemeProvider
} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AssessmentSharpIcon from '@material-ui/icons/AssessmentSharp';
import WorkSharpIcon from '@material-ui/icons/WorkSharp';
import clsx from 'clsx';


const lightTheme = {
	palette: {
		primary: {
			main: '#1E3966',
			dark: '#1E3966'
		},
		secondary: {
			main: '#F5645E'
		},
		background: {
			default: '#F2F2F2'
		}
	}
};

const darkTheme = {
	palette: {
		primary: {
			main: '#2B212B',
			dark: '#2B212B'
		},
		secondary: {
			main: '#F5645E'
		},
		background: {
			default: '#2B212B'
		}
	}
};

const drawerWidth = 240;

const useStyles = makeStyles((currentTheme) => ({
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

type Props = {
	children: React.ReactNode
};

export default function MiniDrawer({ children } : Props) {
	const classes = useStyles();
	const [ state, setState ] = React.useState({
		drawerOpen: false,
		darkModeOn: false
	});
	const currentTheme = createMuiTheme(state.darkModeOn ? darkTheme : lightTheme);

	const toggleTheme = () => {
		setState({
			...state,
			darkModeOn: !state.darkModeOn
		})
	};

	const handleDrawerOpen = () => {
		setState({
			...state,
			drawerOpen: true
		});
	};
  
	const handleDrawerClose = () => {
		setState({
			...state,
			drawerOpen: false
		});
	};

	return (
		<ThemeProvider theme={currentTheme}>
			<div className={classes.root}>
                <ClickAwayListener onClickAway={handleDrawerClose}>
                    <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: state.drawerOpen,
                    })}
                    >
                        <Toolbar>
                            <IconButton
                            onClick={handleDrawerOpen}
                            edge="start"
                            aria-label="menu"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: state.drawerOpen,
                            })}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Header />
                            <section className={classes.rightToolbar}>
                                <FormGroup row>
                                    <FormControlLabel
                                    label="Dark Mode"
                                    control={<MuiSwitch
                                        onChange={toggleTheme}
                                        checked={state.darkModeOn}
                                        name="darkSwitch"
                                        />}
                                    />
                                </FormGroup>
                            </section>
                        </Toolbar>
                    </AppBar>
                </ClickAwayListener>
                <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: state.drawerOpen,
                    [classes.drawerClose]: !state.drawerOpen,
                })}
                classes={{
                    paper: clsx({
                    [classes.drawerOpen]: state.drawerOpen,
                    [classes.drawerClose]: !state.drawerOpen,
                    }),
                }}
                >
                    <div className={classes.toolbar}>
                        <Typography variant="h5">
                            Coin Tracker
                        </Typography>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                    {['Overview', 'Portfolio'].map((text, index) => (
                        <ListItem button key={text}>
                        <ListItemIcon>
                            {text === 'Overview' && (
                                <AssessmentSharpIcon />
                            )}
                            {text === 'Portfolio' && (
                                <WorkSharpIcon />
                            )}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        </ListItem>
                    ))}
                    </List>
                </Drawer>
				<main className={classes.content}>
					<div className={classes.toolbar} />
					{children}
				</main>
			</div>
		</ThemeProvider>
	)
};