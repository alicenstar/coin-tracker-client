import React from 'react';
import {
    Hidden,
	Switch,
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
import { useHistory, useParams } from 'react-router-dom';
import { useTrackerContext } from './TrackerContext';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import { LoginDialog } from './LoginDialog';
import { SignupDialog } from './SignupDialog';
import { useUserContext } from './UserContext';


export default function MiniDrawer() {
    const { setPageElement } = usePageContext()!;
    const { tracker, setId } = useTrackerContext()!;
    const classes = useMiniDrawerStyles();
    const [ drawerOpen, setDrawerOpen ] = React.useState(false);
	const [ darkModeOn, setDarkModeOn ] = React.useState(false);
    const [ newTrackerOpen, setNewTrackerOpen ] = React.useState(false);
    const [ loginOpen, setLoginOpen ] = React.useState(false);
    const [ signupOpen, setSignupOpen ] = React.useState(false);
    const { user, setUser } = useUserContext()!;
    const { id } = useParams<{id: string}>();

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
  
    const handleNav = (event: React.MouseEvent) => {
        var element = event.currentTarget.id;
        setPageElement(element);
    };

    const handleLogout = async () => {
        await fetch('http://localhost:5000/api/auth/logout');
        setUser(undefined);
    };

    React.useEffect(() => {
        if (id) {
            setId(id);
        }
    }, [id, setId]);

    const drawer = (<>
        <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerToggle}>
                <ChevronLeftIcon />
            </IconButton>
        </div>
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
        <Divider />
        <List className={clsx({
            [classes.hide]: !drawerOpen,
        })}>
            {!user 
                ? (
                <>
                    <ListItem
                     button
                     id="login-button"
                     onClick={() => setLoginOpen(!loginOpen)}
                    >
                        <ListItemText secondary="Login" />
                    </ListItem>
                    <ListItem
                     button
                     id="signup-button"
                     onClick={() => setSignupOpen(!signupOpen)}
                    >
                        <ListItemText secondary="Signup" />
                    </ListItem>
                </>
                ) : (
                    <ListItem
                     button
                     id="logout-button"
                     onClick={handleLogout}
                    >
                        <ListItemText secondary="Logout" />
                    </ListItem>
                )
            }
        </List>
    </>);

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
                    <Header />
                    <section className={classes.rightToolbar}>
                        <Hidden xsDown implementation="css">
                            <Switch
                             onChange={toggleTheme}
                             checked={darkModeOn}
                             name="darkSwitch"
                             icon={<Brightness5Icon />}
                             checkedIcon={<Brightness3Icon />}
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
                    // [classes.hide]: drawerOpen,
                 })}
                 classes={{
                    paper: clsx({
                        [classes.drawerOpen]: drawerOpen,
                        [classes.drawerClose]: !drawerOpen,
                        // [classes.hide]: drawerOpen,
                    }),
                 }}
                 open={drawerOpen}
                 ModalProps={{ keepMounted: true }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            {/* Mobile */}
            <Hidden smUp implementation="css">
                <Drawer
                 variant="temporary"
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
                 ModalProps={{ keepMounted: true }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <NewTracker open={newTrackerOpen} setOpen={x => setNewTrackerOpen(x)} />
                <LoginDialog open={loginOpen} setOpen={x => setLoginOpen(x)} />
                <SignupDialog open={signupOpen} setOpen={x => setSignupOpen(x)} />
                <Dashboard />
            </main>
        </div>
	);
};