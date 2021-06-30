import {
  Grid,
  Paper,
  Typography,
  TextField,
  Divider,
  Button,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import FullWidthGrid from '../components/FullWidthGrid';
import { useFormStyles } from '../styles/formStyles';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { settingSchema } from '../yupSchema';
import { useState } from 'react';
import { UPDATE_USER_MUTATION } from '../graphql';
import { useMutation } from '@apollo/react-hooks';
import { useCookies } from 'react-cookie';

const AccountSetting = ({ user, displaySnackMessage }) => {
  document.title = 'Account setting';
  const classes = useFormStyles();
  const [admin, setAdmin] = useState(user.admin? user.admin: false);
  const [cookies, setCookie] = useCookies(['userId', 'reRender']);
  const [updateUser] = useMutation(UPDATE_USER_MUTATION);

  const {
    handleSubmit, control, setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(settingSchema)
  });

  const onSubmit = async (data) => {
    data.userId = user.userId;
    try {
      await updateUser({
        variables: {
          id: cookies.userId,
          isCaptain: data.admin,
          ...data,
        },
      });
      displaySnackMessage('Successfully submitted changes!', 'success');
      setCookie('reRender', new Date());
    } catch (e) {
      console.log(JSON.stringify(e));
      if (e.message === 'Failed to fetch') {
        displaySnackMessage('Error connecting to server!', 'error');
      } else if (e.message === 'You are not allowed to be a captain') {
        displaySnackMessage(e.message, 'error');
        setError('adminCode', {
          message: 'Incorrect admin code!',
          type: 'focus',
        });
      } else {
        displaySnackMessage(e.message, 'error');
      }
    }
  }

  return (
    <FullWidthGrid spacing={0} compact>
      <Grid item xs={12} md={12} lg={12} xl={12}>
        <Paper className={classes.settingPaperRoot}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container className={classes.gridRoot} spacing={3}>
              <Grid item xs={12}>
                <Typography variant='h4'>
                  Account Settings
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider variant='middle' style={{ width: '31%' }}/>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue={user.email}
                  rules={{ required: true }}
                  render={({ field }) =>
                    <TextField
                      label='Email'
                      variant='outlined'
                      fullWidth {...field}
                      error={errors.email? true: false}
                      helperText={errors.email? errors.email.message: ""}
                    />}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="username"
                  control={control}
                  defaultValue={user.username}
                  rules={{ required: true }}
                  render={({ field }) =>
                    <TextField
                      label='Username'
                      variant='outlined'
                      fullWidth {...field}
                      error={errors.username? true: false}
                      helperText={errors.username? errors.username.message: ""}
                    />}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="nickname"
                  control={control}
                  defaultValue={user.nickname? user.nickname: ''}
                  rules={{ required: true }}
                  render={({ field }) =>
                    <TextField
                      label='Nickname'
                      variant='outlined'
                      fullWidth {...field}
                      error={errors.nickname? true: false}
                      helperText={errors.nickname? errors.nickname.message: ""}
                    />}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={4} xl={4}>
                <FormControlLabel
                  label='I am admin.'
                  control={
                    <Controller
                      name='admin'
                      control={control}
                      defaultValue={user.isCaptain}
                      render={({ field }) =>
                        <Switch
                          {...field}
                          onChange={(event) => {
                            field.onChange(event);
                            setAdmin(event.target.checked);
                          }}
                        />}
                    />}
                />
              </Grid>
              {admin && (
                <Grid item xs={12} md={12} lg={8} xl={8}>
                  <Controller
                    name='adminCode'
                    control={control}
                    defaultValue={user.adminCode? user.adminCode: ''}
                    rules={{ required: true }}
                    render={({ field }) =>
                      <TextField
                        label='Please input admin code'
                        variant='outlined'
                        type='password'
                        fullWidth {...field}
                        error={errors.adminCode? true: false}
                        helperText={errors.adminCode? errors.adminCode.message: ""}
                      />}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <Divider variant='middle'/>
              </Grid>
              <Grid item xs={12}>
                <Typography align='right'>
                  <Button
                    type='submit' size="large"
                    color='primary' variant='contained'
                  >
                    Submit Changes
                  </Button>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </FullWidthGrid>
  );
};

export default AccountSetting;
