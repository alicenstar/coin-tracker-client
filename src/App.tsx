import React from 'react';
// import './App.css';
import { Error } from "./Error";
import { Header } from "./Header";
import { NewTracker } from './NewTracker';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink
} from "react-router-dom";
import { Overview } from './Overview';
import { Trackers } from './Trackers';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Switch as MuiSwitch } from '@material-ui/core';
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
import { createMuiTheme, makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AssessmentSharpIcon from '@material-ui/icons/AssessmentSharp';
import WorkSharpIcon from '@material-ui/icons/WorkSharp';
import clsx from 'clsx';


// const defaultTheme = "dark";
// const ThemeContext = React.createContext(
// 	defaultTheme
// );

// type Props = {
// 	children: React.ReactNode
// };

// export const ThemeProvider = ({
// 	children
// }: Props) => {
// 	const [theme, setTheme] = React.useState(
// 		defaultTheme
// 	);

// 	React.useEffect(() => {
// 		// replace with code to get the theme instead of hardcoding
// 		const currentTheme = "light";
// 		setTheme(currentTheme);
// 	}, []);

// 	return (
// 		<ThemeContext.Provider value={theme}>
// 			{children}
// 		</ThemeContext.Provider>
// 	);
// };

// export const useTheme = () => React.useContext(ThemeContext);


const lightTheme = createMuiTheme({
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
});

const darkTheme = createMuiTheme({
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
})

const drawerWidth = 240;

const useStyles = makeStyles((mainTheme) => ({
	root: {
	  display: 'flex',
	},
	appBar: {
	  zIndex: mainTheme.zIndex.drawer + 1,
	  transition: mainTheme.transitions.create(['width', 'margin'], {
		easing: mainTheme.transitions.easing.sharp,
		duration: mainTheme.transitions.duration.leavingScreen,
	  }),
	},
	appBarShift: {
	  marginLeft: drawerWidth,
	  width: `calc(100% - ${drawerWidth}px)`,
	  transition: mainTheme.transitions.create(['width', 'margin'], {
		easing: mainTheme.transitions.easing.sharp,
		duration: mainTheme.transitions.duration.enteringScreen,
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
	  transition: mainTheme.transitions.create('width', {
		easing: mainTheme.transitions.easing.sharp,
		duration: mainTheme.transitions.duration.enteringScreen,
	  }),
	},
	drawerClose: {
	  transition: mainTheme.transitions.create('width', {
		easing: mainTheme.transitions.easing.sharp,
		duration: mainTheme.transitions.duration.leavingScreen,
	  }),
	  overflowX: 'hidden',
	  width: mainTheme.spacing(7) + 1,
	  [mainTheme.breakpoints.up('sm')]: {
		width: mainTheme.spacing(9) + 1,
	  },
	},
	toolbar: {
	  display: 'flex',
	  alignItems: 'center',
	  justifyContent: 'flex-end',
	  padding: mainTheme.spacing(0, 1),
	  // necessary for content to be below app bar
	  ...mainTheme.mixins.toolbar,
	},
	content: {
	  flexGrow: 1,
	  padding: mainTheme.spacing(3),
	},
  }));


type Props = {
	children: React.ReactNode
};

function MiniDrawer({ children} : Props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
	  setOpen(true);
	};
  
	const handleDrawerClose = () => {
	  setOpen(false);
	};

	return (
		<div className={classes.root}>
			<AppBar
			 position="fixed"
			 className={clsx(classes.appBar, {
				[classes.appBarShift]: open,
			  })}
			>
				<Toolbar>
					<IconButton
					 onClick={handleDrawerOpen}
					 edge="start"
					 aria-label="menu"
					 className={clsx(classes.menuButton, {
						[classes.hide]: open,
					  })}
					>
						<MenuIcon />
					</IconButton>
					<Header />
				</Toolbar>
			</AppBar>
			<Drawer
			 variant="permanent"
			 className={clsx(classes.drawer, {
				[classes.drawerOpen]: open,
				[classes.drawerClose]: !open,
			  })}
			  classes={{
				paper: clsx({
				  [classes.drawerOpen]: open,
				  [classes.drawerClose]: !open,
				}),
			  }}
			>
				<div className={classes.toolbar}>
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
	)
}


function App(): JSX.Element {
	const [currentTheme, setTheme] = React.useState(lightTheme);
	const toggleTheme = () => {
		setTheme(lightTheme);
	};

	const classes = useStyles();
	return (
		<React.Fragment>
			<CssBaseline />
			<ThemeProvider theme={currentTheme}>
				<MiniDrawer>
					<MuiSwitch onChange={toggleTheme} />
					<Router>
						<NewTracker />
						<nav>
							<NavLink to="/coins" className="header-link" activeClassName="header-link-active">
								Overview
							</NavLink>
						</nav>
						<Switch>
							<Route path="/coins">
								<Overview />
							</Route>
							<Route path="/:trackerid" children={<Trackers />} />
							<Route exact path="/">
							</Route>
							<Route>
								<Error />
							</Route>
						</Switch>
					</Router>
				</MiniDrawer>
			</ThemeProvider>
		</React.Fragment>
	);
}


export default App;
