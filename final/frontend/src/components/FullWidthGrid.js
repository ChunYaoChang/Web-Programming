import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '1.2rem',
    paddingBottom: '0.8rem',
    margin: 0,
  },
  compact: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    margin: 0,
  },
});

const FullWidthGrid = ({ align='center', ...props}) => {
  const classes = useStyles();
  const gridClass = props.compact
    ? classes.compact
    : classes.root;
  const spacing = props.spacing
    ? props.spacing
    : 2;

  return (
    <Grid className={gridClass} spacing={spacing} container alignItems={align}>
      {props.children}
    </Grid>
  )
};

export default FullWidthGrid;
