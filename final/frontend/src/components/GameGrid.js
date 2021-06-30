import FullWidthGrid from './FullWidthGrid';
import GameCard from './GameCard';
import {
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import { useFormStyles } from '../styles/formStyles';

const GameGrid = ({ game, gameName, user, displaySnackMessage }) => {
  const classes = useFormStyles();
  return (
    <Paper className={classes.settingPaperRoot} elevation={3}>
      <FullWidthGrid compact>
        <Grid item xs={12}>
          <Typography variant='h5' align='left' style={{ wordBreak: 'break-word' }}>
            {gameName}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {game.map((g) => (
              <Grid item xs={12} md={6} key={`GR_${g.url}`}>
                <GameCard
                  user={user}
                  game={g}
                  displaySnackMessage={displaySnackMessage}
                  key={`GC_${g.url}`}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </FullWidthGrid>
    </Paper>
  );
};

export default GameGrid;
