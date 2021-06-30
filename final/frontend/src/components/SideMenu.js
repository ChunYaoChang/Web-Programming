import FullWidthGrid from './FullWidthGrid';
import {
  Paper,
  Grid,
} from '@material-ui/core';
import MenuListContent from './MenuListContent';

const SideMenu = () => {
  return (
    <FullWidthGrid align='flex-start' compact>
      <Grid item xs={12}>
        <Paper>
          <MenuListContent />
        </Paper>
      </Grid>
    </FullWidthGrid>
  );
};

export default SideMenu;
