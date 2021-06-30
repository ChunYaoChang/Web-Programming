import FullWidthGrid from './FullWidthGrid';
import SideMenu from './SideMenu';
import {
  Hidden,
  Grid,
} from '@material-ui/core';

const LoggedInMenuWrapper = (props) => {
  return (
    <FullWidthGrid spacing={0} compact align='flex-start'>
      {/* hide side menu on 'xs' */}
      <Hidden smDown>
        <Grid item md={3} lg={3} xl={3}>
          <SideMenu />
        </Grid>
      </Hidden>
      <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
        {props.children}
      </Grid>
    </FullWidthGrid>
  );
};

export default LoggedInMenuWrapper;
