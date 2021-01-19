import React from 'react';
import {
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
    ThemeProvider
} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AssessmentSharpIcon from '@material-ui/icons/AssessmentSharp';
import WorkSharpIcon from '@material-ui/icons/WorkSharp';
import AddIcon from '@material-ui/icons/Add';
import clsx from 'clsx';
import { lightTheme, darkTheme } from './Themes';
import { usePageContext } from './PageContext';
import { useMiniDrawerStyles } from './MiniDrawerStyles';
import { Header } from './Header';
import { useParams } from 'react-router-dom';


type Props = {
	children: React.ReactNode
};

export default function MiniDrawer({ children }: Props) {
    const { setPageElement } = usePageContext()!;
    const params = useParams<any>();
    let drawerLinks = [
        'Overview',
        'Portfolio',
        'New Tracker'
    ];
    const classes = useMiniDrawerStyles();
	const [ state, setState ] = React.useState({
		drawerOpen: false,
        darkModeOn: false,
	});
    const currentTheme = createMuiTheme(state.darkModeOn ? darkTheme : lightTheme);

    if (params.id === undefined) {
        drawerLinks = [
            'Overview',
            'New Tracker'
        ];
    }

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
    
    const handleNav = (event: React.MouseEvent) => {
        var element = event.currentTarget.id;
        setPageElement(element);
    };

	return (
		<ThemeProvider theme={currentTheme}>
			<div className={classes.root}>
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
                        {drawerLinks.map((text, index) => (
                            <ListItem button id={text} key={text} onClick={handleNav}>
                                <ListItemIcon>
                                    {text === 'Overview' && (
                                        <AssessmentSharpIcon />
                                    )}
                                    {text === 'Portfolio' && (
                                        <WorkSharpIcon />
                                    )}
                                    {text === 'New Tracker' && (
                                        <AddIcon />
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
	);
};