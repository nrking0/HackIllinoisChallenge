import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar} from '@material-ui/core';
import ScrollToColor from "./ScrollToColor";
import './Navbar.css';


const useStyles = makeStyles({
    root: {
        backgroundColor: 'orange',
        paddingBottom: '85px',
        paddingTop: '0px',
        position: 'fixed',
        width: '100%',
        height: '0%',
    },
    appName: {
        marginRight: '100vh',
        fontSize: '40px',
        position: 'relative',
        float: 'left',
        textDecoration: 'none',
        color: 'white',
        marginLeft: '45px'
    },
    navItem: {
        textDecoration: 'none',
        marginRight: '40px',
        marginTop: '10px',
        fontSize: '18px',
        position: 'relative',
        float: 'right',
        color: 'white',
        paddingBottom: '5px',
        '&:after': {
            content: '""',
            position: 'absolute',
            bottom: '0',
            left: '0',
            height: '0',
            width: '0%',
            borderBottom: '2px solid white',
            transition: 'width 0.3s ease',
        },
        '&:hover:after': {
            width: '100%',
        }
    },
    navbar: {
        margin: 'auto',
        textAlign: 'center',
        paddingTop: '10px',
        color: 'white',
        textDecoration: 'none',
    },
    scrollNavbar: {
        paddingTop: '50px',
        paddingBottom: '20px',
    },
    profileIcon: {
        fontSize: '30px',
        // marginTop: '10px',
        marginRight: '5px',
    },
    toolbarButtons: {
        float: 'left',
    },
    root1: {
        backgroundColor: 'orange',
        paddingBottom: '20px',
        paddingTop: '25px',
        position: '-webkit-sticky',
        width: '100%',
        height: '15%',
    },
    appName1: {
        marginRight: '100vh',
        fontSize: '40px',
        position: 'relative',
        float: 'left',
        textDecoration: 'none',
        color: 'white',
        marginLeft: '45px'
    },
    navItem1: {
        textDecoration: 'none',
        marginRight: '40px',
        marginTop: '10px',
        fontSize: '18px',
        position: 'relative',
        float: 'right',
        color: 'white',
        paddingBottom: '5px',
        '&:after': {
            content: '""',
            position: 'absolute',
            bottom: '0',
            left: '0',
            height: '0',
            width: '0%',
            borderBottom: '2px solid white',
            transition: 'width 0.3s ease',
        },
        '&:hover:after': {
            width: '100%',
        }
    }
});


const Navbar = (props) => {
    const classes = useStyles();
    const [home, setHome] = useState(window.location.href.length < 23);

    const handleHome = e => {
        setHome(true)
    }

    const handleLeave = e => {
        setHome(false);
    }

    return (
        <div>
            {home ? (
                <ScrollToColor homeState={home}>
                    <AppBar elevation={0} className={classes.root} id="root">
                        <Toolbar className={classes.navbar}>
                            <Link onClick={handleHome} className={classes.appName} to="/">HackIllinois</Link>
                            <Link onClick={handleLeave} className={classes.navItem} to="/schedule">Schedule</Link>
                        </Toolbar>
                    </AppBar>
                </ScrollToColor>
            ) : (
                    <AppBar elevation={0} className={classes.root1}>
                        <Toolbar className={classes.navbar}>
                            <Link onClick={handleHome} className={classes.appName1} to="/">HackIllinois</Link>
                            <Link onClick={handleLeave} className={classes.navItem1} to="/schedule">Schedule</Link>
                        </Toolbar>
                    </AppBar>
                )}

        </div>

    );
}


export default Navbar;