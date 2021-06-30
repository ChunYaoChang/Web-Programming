import {
  Button,
  Grid,
  Typography,
} from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_ACTIVITY_MUTATION, DELETE_ACTIVITY_MUTATION } from '../graphql';

const ActivityDetail = ({ activity, user, displaySnackMessage }) => {
  const [updateActivity] = useMutation(UPDATE_ACTIVITY_MUTATION);
  const [deleteActivity] = useMutation(DELETE_ACTIVITY_MUTATION);

  const isParticipant = () => {
    let ret = false;
    activity.participants.forEach((e) => {
      if (e.id === user.id) {
        ret = true;
      }
    });
    return ret;
  };

  const handleOut = async () => {
    try {
      await updateActivity({
        variables: {
          ...activity,
          participants: user.id,
          createdUser: activity.createdUser.id,
          type: 'delete',
        },
      });
      displaySnackMessage('Successfully dropped out!');
    } catch (e) {
      console.log(JSON.stringify(e));
      displaySnackMessage(e.message, 'error');
    }
  };

  const handleJoin = async () => {
    try {
      await updateActivity({
        variables: {
          ...activity,
          participants: user.id,
          createdUser: activity.createdUser.id,
          type: 'add',
        },
      });
      displaySnackMessage('Successfully joined!');
    } catch (e) {
      console.log(JSON.stringify(e));
      displaySnackMessage(e.message, 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteActivity({
        variables: {
          ...activity,
        },
      });
      displaySnackMessage('Successfully deleted!')
    } catch (e) {
      console.log(JSON.stringify(e));
      displaySnackMessage(e.message, 'error');
    }
  };

  const participantString =
    `${activity.participants.map((p) => p.nickname? p.nickname: p.username).join(', ')}`;

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
        {/* activity detail */}
        <Typography variant='h6'>
          {activity.title}
        </Typography>
        <Typography gutterBottom>
          {`時間: ${activity.startDatetime.slice(11,-3)} ~ ${activity.endDatetime.slice(11, -3)}`}
        </Typography>
        <Typography variant='body1' color='textSecondary' style={{ wordBreak: 'break-word' }}>
          {`說明: ${activity.description? activity.description: '無'}`}
        </Typography>
        <Typography variant='subtitle1' color='textSecondary' style={{ wordBreak: 'break-word' }}>
          {`參加者: ${participantString === '' ? '無': participantString}`}
        </Typography>
      </Grid>
      <Grid item xs={12} xm={12} md={4} lg={4} xl={4}>
        {/* button */}
        <Grid container spacing={1}>
          {isParticipant() && (
            <Grid item xs={12} align='right'>
              <Button variant='outlined' color='primary' onClick={handleOut}>退出</Button>
            </Grid>
          )}
          {!isParticipant() && (
            <Grid item xs={12} align='right'>
              <Button variant='contained' color='primary' onClick={handleJoin}>參加</Button>
            </Grid>
          )}
          {(user.isCaptain || user.id === activity.createdUser.id) && (
            <Grid item xs={12} align='right'>
              <Button variant='contained' color='secondary' onClick={handleDelete}>刪除</Button>
            </Grid>
          )}
        </Grid>

      </Grid>
    </Grid>
  );
};

export default ActivityDetail;
