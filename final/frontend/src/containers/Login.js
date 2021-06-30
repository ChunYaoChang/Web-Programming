import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useFormStyles } from '../styles/formStyles';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../yupSchema';
import { LOGIN_MUTATION, GET_USER_ID_MUTATION } from '../graphql';
import { useMutation } from '@apollo/react-hooks';
import { useCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';

const Login = ({ displaySnackMessage }) => {
  document.title = 'Login';
  const [redirect, setRedirect] = useState(null);
  const [cookies, setCookie] = useCookies();
  const [login] = useMutation(LOGIN_MUTATION);
  const [getUserId] = useMutation(GET_USER_ID_MUTATION);
  const classes = useFormStyles();
  const {
    handleSubmit, control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    try {
      const { data: { login: res } } = await login({
        variables: data,
      });
      if (res === true) {
        const { data: { getUserIdByUsername: userId } } = await getUserId({
          variables: { username: data.username },
        });
        // redirect first, or setting cookie will trigger <App /> re-render
        setRedirect('/successfullLogin');
        if (data.rememberMe) {
          setCookie('userId', userId);
        } else {
          // set a short duration cookie
          // 1800 seconds (30 mins)
          setCookie('userId', userId, { maxAge: 1800 });
        }
      } else {
        displaySnackMessage(
          'Incorrect username or password!',
          'error'
        );
      }
    } catch (e) {
      console.log(JSON.stringify(e));
      if (e.message === 'Failed to fetch') {
        displaySnackMessage('Error connecting to server!', 'error');
      } else {
        displaySnackMessage(e.message, 'error');
      }
    }
  };

  if (redirect) {
    return (<Redirect to={redirect}/>);
  }

  return (<>
    <Paper className={classes.paperRoot} style={{ width: 500 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container className={classes.gridRoot} spacing={3}>
          <Grid item xs={12}>
            <Typography variant='h4' align='center'>
              Login
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="username"
              control={control}
              defaultValue=''
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
              name="password"
              control={control}
              defaultValue=''
              rules={{ required: true }}
              render={({ field }) =>
                <TextField
                  label='Password'
                  type='password'
                  variant='outlined'
                  fullWidth {...field}
                  error={errors.password? true: false}
                  helperText={errors.password? errors.password.message: ""}
                />}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name='rememberMe'
              control={control}
              defaultValue={false}
              render={({ field }) =>
                <>
                  <Checkbox
                    className={classes.checkbox}
                    color='primary'
                    {...field}
                  />Remember Me
                </>}
              >
            </Controller>
          </Grid>
          <Grid item xs={12}>
            <Typography align='center'>
              <Button
                type='submit' size='large'
                color='primary' variant='contained'
              >
                Login
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Paper>
  </>);
};

export default Login;
