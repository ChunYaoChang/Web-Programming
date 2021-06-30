import {
  Divider,
  Typography,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  gridRoot: {
    paddingTop: '3rem',
    paddingBottom: '1.3rem',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    margin: 0,
  },
});

const Footer = () => {
  const classes = useStyles();
  const copyright = `© ${new Date().getFullYear()} vincentthh35, ChunYaoChang`

  return (<>
    <Grid container spacing={4} className={classes.gridRoot}>
      <Grid item xs={12}>
        <Divider variant='middle' />
      </Grid>
      <Grid item>
        <Typography variant='subtitle2'>
          {copyright}
        </Typography>
      </Grid>
    </Grid>
  </>);
};

export default Footer;
