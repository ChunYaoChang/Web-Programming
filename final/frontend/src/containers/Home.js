import Introduction from '../components/Introduction';
import FullWidthGrid from '../components/FullWidthGrid';
import LoggedInMenuWrapper from '../components/LoggedInMenuWrapper';
import UserInfoCard from '../components/UserInfoCard';
import {
  Paper,
  Grid,
  Typography,
} from '@material-ui/core';
import { useFormStyles } from '../styles/formStyles';
import { useQuery } from '@apollo/react-hooks';
import { ALL_USER_QUERY, USER_SUBSCRIPTION } from '../graphql';
import { useEffect } from 'react';

const Home = ({ loginPayload, displaySnackMessage }) => {
  document.title = '球隊系統';
  // subscribe?
  const { loading, error, data, subscribeToMore } = useQuery(ALL_USER_QUERY);
  const classes = useFormStyles();

  useEffect(() => {
    try {
      subscribeToMore({
        document: USER_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData) return prev;
          return subscriptionData.data.user;
        }
      });
    } catch (e) {
      console.log(JSON.stringify(e));
      displaySnackMessage(e.message, 'error');
    }
  });

  if (!loginPayload || !loginPayload.status) {
    return (
      <Introduction />
    );
  }
  let sortedUser = [];
  if (!loading && !error) {
    sortedUser = [loginPayload.user, ...data.allUser.filter((e) => e.id !== loginPayload.user.id)];
  }

  return (
    <LoggedInMenuWrapper>
      <FullWidthGrid align='flex-start' compact>
        <Grid item xs={12}>
          <Paper className={classes.settingPaperRoot}>
            <FullWidthGrid compact>
              <Grid item xs={12}>
                <Typography variant='h5' align='left'>
                  所有成員
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  {loading && "Loading..."}
                  {error && 'Error!'}
                  {!loading && !error && sortedUser.map((u, i) => (
                    <Grid item xs={12} md={4} key={`grid_${u.id}`}>
                      <UserInfoCard
                        isMe={i === 0}
                        me={loginPayload.user}
                        user={u}
                        key={`user_${u.id}`}
                        displaySnackMessage={displaySnackMessage}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </FullWidthGrid>
          </Paper>
        </Grid>
      </FullWidthGrid>
    </LoggedInMenuWrapper>
  );
};

export default Home;
