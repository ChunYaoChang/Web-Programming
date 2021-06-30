import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_USER_MUTATION } from '../graphql';

const useStyles = makeStyles({
  root: {
    paddingBottom: '0.5rem',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const UserInfoCard = ({ user, me, isMe, displaySnackMessage }) => {
  const classes = useStyles();
  const [deleteUser] = useMutation(DELETE_USER_MUTATION);

  const handleDelete = async () => {
    try {
      await deleteUser({
        variables: {
          id: user.id,
        },
      });
      displaySnackMessage('Successfully deleted!');
    } catch (e) {
      console.log(JSON.stringify(e));
      displaySnackMessage(e.message, 'error');
    }
  };

  return (
    <Card className={classes.root} elevation={4} variant={isMe? 'outlined': 'elevation'}>
      <CardContent>
        <Typography variant="h6" component="h2">
          {user.nickname? user.nickname: user.username}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {user.isCaptain? '管理員': '隊員'}
        </Typography>
        <Typography variant="body2" component="p">
          {user.email}
        </Typography>
      </CardContent>
      {me.isCaptain && !isMe && (
        <CardActions style={{ justifyContent: 'flex-end', paddingRight: '0.8rem' }}>
          <Button
            size="small"
            variant='contained'
            color='secondary'
            onClick={handleDelete}
          >
            Delete
          </Button>
        </CardActions>
      )}
      {me.isCaptain && isMe && (
        <CardActions style={{ justifyContent: 'flex-end', paddingRight: '0.8rem' }}>
          <Button
            size="small"
            variant='contained'
            color='primary'
            component={RouterLink}
            to='/accountSetting'
          >
            Account Settings
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default UserInfoCard;
