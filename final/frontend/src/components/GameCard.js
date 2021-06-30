import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from '@material-ui/core';
import ReactPlayer from 'react-player';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_VIDEO_MUTATION } from '../graphql';

const GameCard = ({ game, user, displaySnackMessage }) => {
  const [deleteVideo] = useMutation(DELETE_VIDEO_MUTATION);

  const handleDelete = async  () => {
    try {
      await deleteVideo({
        variables: {
          ...game,
        },
      });
      displaySnackMessage('Successfully deleted!');
    } catch (e) {
      console.log(JSON.stringify(e));
      displaySnackMessage(e.message, 'error');
    }
  };

  return (
    <Card elevation={5} style={{ padding: '0.5rem' }}>
      <CardContent>
        <Typography variant='h6'>
          {`${game.gameType}: (${game.datetime.split('-').join('/').slice(5)})`}
        </Typography>
        <Typography variant='subtitle2' color='textSecondary' style={{ wordBreak: 'break-word' }}>
          {game.description}
          {!game.description && <br/>}
        </Typography>
        <br />
        <div style={{ position: 'relative', paddingTop: '56.25%' }}>
          <ReactPlayer
            style={{ position: 'absolute', top: 0, left: 0 }}
            url={game.url}
            controls
            width='100%'
            height='100%'
            config={{ youtube: { playerVars: { origin: 'https://www.youtube.com' } } }}
          />
        </div>
      </CardContent>
      {user.isCaptain && (
        <CardActions style={{ paddingLeft: '0.8rem' }}>
          <Typography align='right'>
            <Button
              size="small"
              variant='contained'
              color='secondary'
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Typography>
        </CardActions>
      )}
    </Card>
  );
};

export default GameCard;
