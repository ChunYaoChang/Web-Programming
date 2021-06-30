import FullWidthGrid from '../components/FullWidthGrid';
import CreateVideoDialog from './CreateVideoDialog';
import GameGrid from '../components/GameGrid';
import {
  Grid,
  Typography,
  Paper,
  Button,
  Divider,
} from '@material-ui/core';
import { useFormStyles } from '../styles/formStyles';
import { useQuery } from '@apollo/react-hooks';
import { ALL_VIDEO_QUERY, VIDEO_SUBSCRIPTION } from '../graphql';
import { useState, useEffect } from 'react';
import { groupBy } from '../core';

const Video = ({ user, displaySnackMessage }) => {
  document.title = '影片';
  const classes = useFormStyles();
  const { data, loading, error, subscribeToMore } = useQuery(ALL_VIDEO_QUERY);
  const [createOpen, setCreateOpen] = useState(false);

  const handleCreate = () => {
    setCreateOpen(true);
  };

  useEffect(() => {
    try {
      subscribeToMore({
        document: VIDEO_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData) return prev;
          return subscriptionData.data.video;
        }
      })
    } catch (e) {
      console.log(JSON.stringify(e));
      displaySnackMessage(e.message, 'error');
    }
  })

  const dataGroup = !loading
    ? groupBy(data.allVideo, 'gameName')
    : {};

  return (<>
    <CreateVideoDialog
      formOpen={createOpen}
      setFormOpen={setCreateOpen}
      displaySnackMessage={displaySnackMessage}
    />
    <FullWidthGrid align='flex-start' compact>
      <Grid item xs={12}>
        <Paper className={classes.settingPaperRoot}>
          <FullWidthGrid compact>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant='h5' align='left'>
                    影片
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='h5' align='right'>
                    <Button variant='contained' color='primary' onClick={handleCreate}>
                      新增影片
                    </Button>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider variant='middle' />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {error && "Error..."}
                {loading && "Loading..."}
                {!loading && (
                  Object.keys(dataGroup).map((k) => (
                    <Grid item xs={12} key={`grid_${k}`}>
                      <GameGrid
                        game={dataGroup[k]}
                        key={`GG_${k}`}
                        gameName={k}
                        user={user}
                        displaySnackMessage={displaySnackMessage}
                      />
                    </Grid>
                  ))
                )}
                {/* {!loading && dataGroup().map((e) => e.title).join(', ')} */}
              </Grid>
            </Grid>
          </FullWidthGrid>
        </Paper>
      </Grid>
    </FullWidthGrid>
  </>);
};

export default Video;
