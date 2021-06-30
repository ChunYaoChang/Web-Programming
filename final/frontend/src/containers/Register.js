import { useState } from 'react';
import { useFormStyles } from '../styles/formStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../yupSchema';
import { Redirect } from 'react-router-dom';
// import { register } from '../core/auth';
import { CREATE_USER_MUTATION } from '../graphql';
import { useMutation } from '@apollo/react-hooks';

const Register = ({ displaySnackMessage }) => {
  document.title = 'Register';
  const [redirect, setRedirect] = useState(null);
  const [register] = useMutation(CREATE_USER_MUTATION);
  const classes = useFormStyles();
  const {
    handleSubmit, control, setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(registerSchema)
  });

  const onSubmit = async (data) => {
    try {
      await register({
        variables: data,
      });
      setRedirect('/successfullRegister');
    } catch (e) {
      console.log(JSON.stringify(e));
      if (e.message === 'User already exists') {
        setError('username', {
          type: 'focus',
          message: 'This username has been used!'
        }, {
          shouldFocus: true,
        });
      } else if (e.message === 'Failed to fetch') {
        displaySnackMessage('Error connecting to server!', 'error');
      } else {
        displaySnackMessage('Unknown error!', 'error');
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
              Register
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              defaultValue=''
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
              name="confirmPassword"
              control={control}
              defaultValue=''
              rules={{ required: true }}
              render={({ field }) =>
                <TextField
                  label='Confirm password'
                  type='password'
                  variant='outlined'
                  fullWidth {...field}
                  error={errors.confirmPassword? true: false}
                  helperText={errors.confirmPassword? errors.confirmPassword.message: ""}
                />}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider variant='middle'/>
          </Grid>
          <Grid item xs={12}>
            <Typography align='center'>
              <Button
                type='submit' size="large"
                color='primary' variant='contained'
              >
                Register
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Paper>
  </>);
};

export default Register;
