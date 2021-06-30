import {
  Typography,
  Paper,
  Grid,
  Divider,
} from '@material-ui/core';
import FullWidthGrid from './FullWidthGrid';
import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

const SuccessfullLogout = () => {
  document.title = '重導向...';
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRedirect('/');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (redirect) {
    return (<Redirect to={redirect} />)
  }

  return (
    <FullWidthGrid>
      <Grid item xs={12} md={6} lg={6} xl={6}>
        <Paper style={{ paddingRight: '1rem', paddingLeft: '1rem' }}>
          <FullWidthGrid spacing={4}>
            <Grid item xs={12}>
              <Typography variant='h5' align='center'>
                您已經成功登出！即將重導向回首頁...
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

export default SuccessfullLogout;
