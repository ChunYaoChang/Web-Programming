import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuListContent from './MenuListContent';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const SideMenuButton = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleToggle = (o) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(o);
  };

  const list = () => (
      <div
        style={{ width: 200 }}
        role="presentation"
        onClick={handleToggle(false)}
        onKeyDown={handleToggle(false)}
      >
        <MenuListContent />
      </div>
    );

  return (<>
    <IconButton
      edge="start"
      color="inherit"
      aria-label="menu"
      onClick={handleToggle(true)}
      className={classes.menuButton}
    >
      <MenuIcon />
    </IconButton>
    <Drawer anchor='left' open={open} onClose={handleToggle(false)}>
      {list()}
    </Drawer>
  </>);
};

export default SideMenuButton;
