import React from 'react';
import {
    Hidden,
	Switch,
    useMediaQuery,
    useTheme,
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
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AssessmentSharpIcon from '@material-ui/icons/AssessmentSharp';
import WorkSharpIcon from '@material-ui/icons/WorkSharp';
import AddIcon from '@material-ui/icons/Add';
import clsx from 'clsx';
import { usePageContext } from '../context/PageContext';
import { useMiniDrawerStyles } from '../styles/MiniDrawerStyles';
import { Header } from './Header';
import { NewTracker } from './NewTrackerDialog';
import Dashboard from './Dashboard';
import { useParams } from 'react-router-dom';
import { useTrackerContext } from '../context/TrackerContext';
import { useThemeContext } from '../context/ThemeContext';
import Cookies from 'universal-cookie';


const cookies = new Cookies();

export default function MiniDrawer() {
    const { setPageElement } = usePageContext()!;
    const { tracker, setId } = useTrackerContext()!;
    const { darkMode, setDarkMode } = useThemeContext()!;
    const classes = useMiniDrawerStyles();
    const [ drawerOpen, setDrawerOpen ] = React.useState(false);
    const [ newTrackerOpen, setNewTrackerOpen ] = React.useState(false);
    const [ mobileOpen, setMobileOpen ] = React.useState(false);
    const { id } = useParams<{id: string}>();
    const theme = useTheme();
    const xsScreen = useMediaQuery(theme.breakpoints.down('xs'));

    let drawerLinks;
    tracker
        ? drawerLinks = ['Overview', 'Portfolio']
        : drawerLinks = ['Overview'];

    const toggleTheme = () => {

        // Toggle currentTheme and switched
        const currentTheme = darkMode ? 'light' : 'dark';
        setDarkMode(!darkMode);
        // Get date a month from now (add month in milliseconds)
        const d = Date.now() + 2629800000;
        const expDate = new Date(d);
        // Update cookie value
        cookies.set('theme', currentTheme, {
            path: '/',
            secure: true,
            sameSite: "strict",
            expires: expDate
        });
    };

	const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
	};

    const handleMobileToggle = () => {
        setMobileOpen(!mobileOpen);
    };
  
    const handleNav = (event: React.MouseEvent) => {
        var element = event.currentTarget.id;
        setPageElement(element);
        setDrawerOpen(false);
        setMobileOpen(false);
    };

    React.useEffect(() => {
        if (id) {
            setId(id);
        }
    }, [id, setId]);

    const toggleDrawer = (open: boolean) => {
        setMobileOpen(open);
        setDrawerOpen(open);
    };

    // Check if user resizes window while drawer is open
    React.useEffect(() => {
        if (drawerOpen && xsScreen) {
            setMobileOpen(true);
            setDrawerOpen(false);
        }
    }, [drawerOpen, mobileOpen, xsScreen]);

    const drawer = (
        <React.Fragment>
            <Divider />
            <List>
                {drawerLinks.map((text) => (
                    <ListItem
                     aria-label={text}
                     button
                     id={text}
                     key={text}
                     onClick={handleNav}
                    >
                        <ListItemIcon className={classes.drawerIcon}>
                            {text === 'Overview' && (
                                <AssessmentSharpIcon aria-label={text} />
                            )}
                            {text === 'Portfolio' && (
                                <WorkSharpIcon aria-label={text} />
                            )}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
                <ListItem
                 aria-label='New Tracker'
                 button
                 id='New Tracker'
                 onClick={() => setNewTrackerOpen(!newTrackerOpen)}
                >
                    <ListItemIcon aria-label='New Tracker' className={classes.drawerIcon}>
                        <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary='New Tracker' />
                </ListItem>
            </List>
        </React.Fragment>
    );

	return (
        <div className={classes.root}>
            <AppBar
             color="default"
             position="fixed"
             className={clsx(classes.appBar, {
                [classes.appBarShift]: drawerOpen,
             })}
            >
                <Toolbar>
                    <Hidden xsDown implementation="css">
                        <IconButton
                         aria-label='Open Menu'
                         onClick={handleDrawerToggle}
                         edge="start"
                         className={clsx(classes.menuButton, {
                            [classes.hide]: drawerOpen,
                        })}
                        >
                            <MenuIcon aria-label='menu icon' />
                        </IconButton>
                    </Hidden>
                    <Hidden smUp implementation="css">
                        <IconButton
                         onClick={handleMobileToggle}
                         edge="start"
                         aria-label="Open Menu"
                         className={clsx(classes.menuButton)}
                        >
                            <MenuIcon aria-label='menu icon' />
                        </IconButton>
                    </Hidden>
                    <Header />
                    <section className={classes.rightToolbar}>
                        <Hidden xsDown implementation="css">
                            <Switch
                             onChange={toggleTheme}
                             checked={darkMode}
                             aria-label='toggle dark mode'
                            />
                        </Hidden>
                    </section>
                </Toolbar>
            </AppBar>
            {/* Large screens */}
            <Hidden xsDown implementation="css">
                <Drawer
                 variant="permanent"
                 className={clsx(classes.drawer, {
                    [classes.drawerOpen]: drawerOpen,
                    [classes.drawerClose]: !drawerOpen,
                 })}
                 classes={{
                    paper: clsx({
                        [classes.drawerOpen]: drawerOpen,
                        [classes.drawerClose]: !drawerOpen,
                    }),
                 }}
                 open={drawerOpen}
                 ModalProps={{
                    keepMounted: true,
                }}
                >
                    <div className={classes.toolbar}>
                        <IconButton
                         className={classes.closeDrawerIcon}
                         aria-label='Collapse Menu'
                         onClick={handleDrawerToggle}
                        >
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    {drawer}
                </Drawer>
            </Hidden>
            {/* Mobile */}
            <Hidden smUp implementation="css">
                <Drawer
                 variant="temporary"
                 className={clsx(classes.drawer, {
                    [classes.drawerOpen]: mobileOpen,
                    [classes.drawerClose]: !mobileOpen,
                 })}
                 classes={{
                    paper: clsx({
                        [classes.drawerOpen]: mobileOpen,
                        [classes.drawerClose]: !mobileOpen,
                    }),
                 }}
                 open={mobileOpen}
                 ModalProps={{ keepMounted: true }}
                 onBackdropClick={() => toggleDrawer(false)}
                >
                    <div className={classes.toolbar}>
                        <IconButton
                         className={classes.closeDrawerIcon}
                         onClick={handleMobileToggle}
                        >
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    {drawer}
                </Drawer>
            </Hidden>
            <main className={classes.content} onClick={() => toggleDrawer(false)}>
                <div className={classes.toolbar} />
                <NewTracker open={newTrackerOpen} setOpen={x => setNewTrackerOpen(x)} />
                <Dashboard />
            </main>
        </div>
	);
};