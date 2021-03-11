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
import { usePageContext } from './PageContext';
import { useMiniDrawerStyles } from './MiniDrawerStyles';
import { Header } from './Header';
import { NewTracker } from './NewTrackerDialog';
import Dashboard from './Dashboard';
import { useParams } from 'react-router-dom';
import { useTrackerContext } from './TrackerContext';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness3Icon from '@material-ui/icons/Brightness3';


export default function MiniDrawer() {
    const { setPageElement } = usePageContext()!;
    const { tracker, setId } = useTrackerContext()!;
    const classes = useMiniDrawerStyles();
    const [ drawerOpen, setDrawerOpen ] = React.useState(false);
	const [ darkModeOn, setDarkModeOn ] = React.useState(false);
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
		setDarkModeOn(!darkModeOn);
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
        <>
        <Divider />
        <List>
            {drawerLinks.map((text, index) => (
                <ListItem
                 button
                 id={text}
                 key={index}
                 onClick={handleNav}
                >
                    <ListItemIcon className={classes.drawerIcon}>
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
            <ListItem
             button
             id='New Tracker'
             onClick={() => setNewTrackerOpen(!newTrackerOpen)}
            >
                <ListItemIcon className={classes.drawerIcon}>
                    <AddIcon />
                </ListItemIcon>
                <ListItemText primary='New Tracker' />
            </ListItem>
        </List>
        </>
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
                        onClick={handleDrawerToggle}
                        edge="start"
                        aria-label="menu"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: drawerOpen,
                        })}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Hidden smUp implementation="css">
                        <IconButton
                        onClick={handleMobileToggle}
                        edge="start"
                        aria-label="menu"
                        className={clsx(classes.menuButton)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Header />
                    {/* <section className={classes.rightToolbar}>
                        <Hidden xsDown implementation="css">
                            <Switch
                             onChange={toggleTheme}
                             checked={darkModeOn}
                             name="darkSwitch"
                             icon={<Brightness5Icon />}
                             checkedIcon={<Brightness3Icon />}
                            />
                        </Hidden>
                    </section> */}
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
                        <IconButton onClick={handleDrawerToggle}>
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
                        <IconButton onClick={handleMobileToggle}>
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