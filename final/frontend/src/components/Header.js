import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// components
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Link,
  Hidden,
} from '@material-ui/core';
// icons
import SunIcon from '@material-ui/icons/Brightness5';
import MoonIcon from '@material-ui/icons/Brightness2';
// routing
import { Link as RouterLink } from 'react-router-dom';

import UserMenuButton from './UserMenuButton';
import SideMenuButton from './SideMenuButton';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 2,
  },
  toolbar: {
    minHeight: 60,
    paddingRight: 10,
  },
}));

const Header = (props) => {
  const classes = useStyles();

  const unLoginComponent = (<>
    <Tooltip title='Register'>
      <Button color="inherit" component={RouterLink} to='/register'>
        註冊
      </Button>
    </Tooltip>
    <Tooltip title='Login'>
      <Button color="inherit" component={RouterLink} to='/login'>
        登入
      </Button>
    </Tooltip>
    <Tooltip title='Toggle light/dark theme'>
      <IconButton color='inherit' onClick={() => props.setUserToggleDarkMode(!props.userToggleDarkMode)}>
        { props.userToggleDarkMode ? <SunIcon /> : <MoonIcon /> }
      </IconButton>
    </Tooltip>
  </>);

  const loginComponent = (<>
    <UserMenuButton
      setUserToggleDarkMode={props.setUserToggleDarkMode}
      loginPayload={props.loginPayload}
    />
  </>)

  return (
    <div className={classes.root}>
      <AppBar position='sticky'>
        <Toolbar className={classes.toolbar}>
          <Hidden mdUp>
            <SideMenuButton />
          </Hidden>
          <Typography className={classes.title}>
            <Link color='inherit' underline='none' component={RouterLink} to='/'>球隊系統</Link>
          </Typography>
          {props.loginPayload?.status && loginComponent}
          {!props.loginPayload?.status && unLoginComponent}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
