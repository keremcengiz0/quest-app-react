import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { LockOpen } from "@mui/icons-material";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textAlign : "left"
    },
    link: {
        textDecoration : "none",
        boxShadow : "none",
        color : "white"
    }
  }));

function Navbar() {
    const classes = useStyles();

    let navigate = useNavigate();

    const onClick = () => {
        localStorage.removeItem("tokenKey");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("userName");
        navigate(0);
    }

    return(
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Link className={classes.link} to="/">Home</Link>
                    </Typography>
                    <Typography variant="h6">
                        {localStorage.getItem("currentUser") == null ? <Link className={classes.link} to="/auth">Login/Register</Link> : 
                        <div>  <IconButton className={classes.link} onClick={onClick}> <LockOpen> </LockOpen> </IconButton> 
                        <Link className={classes.link} to={{pathname:'/users/' + localStorage.getItem("currentUser")}}>Profile</Link>
                        </div>}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )

}



export default Navbar;




