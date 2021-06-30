import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import TodayIcon from '@material-ui/icons/Today';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link as RouterLink } from 'react-router-dom';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

const MenuListContent = () => {
  return (
    <List>
      <ListItem button component={RouterLink} to='/'>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button component={RouterLink} to='/calendar'>
        <ListItemIcon>
          <TodayIcon />
        </ListItemIcon>
        <ListItemText primary="Calendar" />
      </ListItem>
      <ListItem button component={RouterLink} to='/video'>
        <ListItemIcon>
          <PlayCircleOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Video" />
      </ListItem>
      <ListItem button component={RouterLink} to='/accountSetting'>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Account Settings" />
      </ListItem>
    </List>
  );
};

export default MenuListContent;
