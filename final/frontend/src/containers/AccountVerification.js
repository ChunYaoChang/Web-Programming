import { ACCOUNT_VERIFY_MUTATION } from '../graphql';
import { useMutation } from '@apollo/react-hooks';
import FullWidthGrid from '../components/FullWidthGrid';
import { useAsync } from 'react-async-hook';
import {
  Grid,
  Paper,
  Typography,
  Divider,
} from '@material-ui/core';

const AccountVerification = (props) => {
  const [verify] = useMutation(ACCOUNT_VERIFY_MUTATION);
  const key = props.match.params.key;
  let message;
  const f = async () => {
    try {
      return await verify({
        variables: {
          key
        },
      });
    } catch (e) {
      console.log(JSON.stringify(e));
      if (e.message === 'Failed to fetch') {
        props.displaySnackMessage(
          'Error connecting to server!',
          'error'
        );
      }
    }
  };
  const result = useAsync(f, []);

  if (result.loading) {
    message = 'Loading...';
  } else if (result.error) {
    message = 'Error...';
  }

  if (result.result) {
    if (result.result.data.verify) {
      message = '您已經成功完成帳號認證！';
    } else {
      message = 'URL 好像出了問題...';
    }
  }

  return (
    <FullWidthGrid>
      <Grid item xs={12} md={6} lg={6} xl={6}>
        <Paper style={{ paddingRight: '1rem', paddingLeft: '1rem' }}>
          <FullWidthGrid spacing={4}>
            <Grid item xs={12}>
              <Typography variant='h5' align='center'>
                {message}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider variant='middle' />
            </Grid>
          </FullWidthGrid>
        </Paper>
      </Grid>
    </FullWidthGrid>
  );
};

export default AccountVerification;
