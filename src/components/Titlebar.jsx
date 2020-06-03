import React from 'react'

import {
Typography,
AppBar,
Toolbar,
Drawer,
List,
ListItem,
Link,
IconButton

} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';

import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    appbar: {
        background: "#010101",
        
    },
    heading: {
        color: "#f0ece2",
    },
    link:{
        color : "#E5E5E5",
        marginLeft:"auto",
        [theme.breakpoints.down("sm")]:{
            display: "none"
        },
        [theme.breakpoints.between("sm", "md")]:{
            display: "block"
        }
    },
    icon:{
        color: "white"
    },
    iconbtn: {
        marginLeft:"auto",
        [theme.breakpoints.up("sm")]:{
            display: "none"
        }
    },

}))

const Titlebar = () => {
    const [open, setOpen] = React.useState(false);

    const classes = useStyles();
    return (
        <>
        <Drawer
            anchor="top"
            open={open}
            onClose={()=> setOpen(false)}
            className={classes.drawer}>
                <List>
                    <ListItem>
                        <Link style={{color: "#606060"}} href="https://github.com/piyushverma001/IP-geolocation">
                            Github
                        </Link>
                    </ListItem>
                </List>
            </Drawer>
        
            <AppBar className={classes.appbar}>
                <Toolbar>
                    <LocationSearchingIcon style={{marginRight:"10px"}}/>
                    <Typography className={classes.heading} variant="h4" >
                        IP lOCATOR
                    </Typography>
                    <div className={classes.link}>
                        <Link variant="body1" style={{color: "#E5E5E5"}} href="https://github.com/piyushverma001/IP-geolocation">
                            Github
                        </Link>
                    </div>
                    <IconButton className={classes.iconbtn} onClick={()=> setOpen(true)}>
                        <MenuIcon className={classes.icon}/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </>
    )
}


export default Titlebar;