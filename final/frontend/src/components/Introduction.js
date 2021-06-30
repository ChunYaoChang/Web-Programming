import {
  Typography,
  Paper,
  Grid,
  Divider,
  Button,
} from '@material-ui/core';
import FullWidthGrid from './FullWidthGrid';

import { Link as RouterLink } from 'react-router-dom';

const Introduction = () => {
  return (
    <FullWidthGrid>
      <Grid item xs={12} md={6} lg={6} xl={6}>
        <Paper style={{ paddingRight: '1rem', paddingLeft: '1rem' }}>
          <FullWidthGrid spacing={4}>
            <Grid item xs={12}>
              <Typography variant='h5' align='center'>
                歡迎使用球隊系統 !
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider variant='middle' />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6' align='center'>
                如果你是球隊管理員...
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle1' align='center'>
                你可以在這個系統統計球員練球的參加意願，以及記錄比賽過程。
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={8} xl={7}>
              <Divider variant='middle' />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6' align='center'>
                如果你是球員...
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle1' align='center'>
                你可以在這個系統觀看自己比賽的紀錄，建立練球活動並參加。
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={8} xl={7}>
              <Divider variant='middle' />
            </Grid>
            <Grid item xs={6} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant='contained' size='large' color='secondary' component={RouterLink} to='/register'>
                註冊
              </Button>
              <Button variant='contained' size='large' color='primary' component={RouterLink} to='/login'>
                登入
              </Button>
            </Grid>
          </FullWidthGrid>
        </Paper>
      </Grid>
    </FullWidthGrid>
  );
};

export default Introduction;
