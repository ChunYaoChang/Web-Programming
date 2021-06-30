import {
  Button,
  Popper,
  Paper,
  Grow,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, deepPurple, blueGrey } from '@material-ui/core/colors';
import { logout } from '../core/auth';
import { useCookies } from 'react-cookie';
import { Redirect, Link as RouterLink } from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

const useStyles = makeStyles((theme) => ({
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  blueGrey: {
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: blueGrey[500],
  },
}));

const UserMenuButton = ({ setUserToggleDarkMode, loginPayload }) => {
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(null);
  const anchorRef = useRef(null);
  const classes = useStyles();
  const [cookies, setCookie, removeCookie] = useCookies();

  // redirect after logout
  if (redirect) {
    return (<Redirect to={redirect} />);
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleToggleTheme = () => {
    setUserToggleDarkMode((old) => !old);
  }

  const handleLogout = () => {
    logout(cookies, removeCookie);
    setRedirect('/redirect-to-home-after-logout');
  }

  const displayName = loginPayload.user.nickname
    ? loginPayload.user.nickname
    : loginPayload.user.username;
  const color = loginPayload.user.isCaptain
    ? classes.blueGrey
    : classes.orange;

  return (
    <div>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color='inherit'
        style={{ textTransform: 'none' }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* userChar */}
          <Typography style={{ paddingRight: '0.7rem' }}>{displayName}</Typography>
          <Avatar className={color}>{displayName[0]}</Avatar>
        </div>
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow">
                  <MenuItem
                    onClick={handleToggleTheme}
                  >
                    <ListItemIcon style={{ minWidth: '2.2rem' }}>
                      <ColorLensIcon />
                    </ListItemIcon>
                    <ListItemText primary="Toggle Theme" />
                  </MenuItem>
                  <MenuItem
                    component={RouterLink}
                    to='/accountSetting'
                  >
                    <ListItemIcon style={{ minWidth: '2.2rem' }}>
                      <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Account Settings" />
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon style={{ minWidth: '2.2rem' }}>
                      <MeetingRoomIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default UserMenuButton;
