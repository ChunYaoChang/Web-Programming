import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  TextField,
} from '@material-ui/core';
import {
  KeyboardDatePicker,
} from '@material-ui/pickers'
import { dateToString, dateToDay } from '../core'
import { useForm, Controller } from 'react-hook-form';
import { useFormStyles } from '../styles/formStyles';
import { videoSchema } from '../yupSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { CREATE_VIDEO_MUTATION } from '../graphql';
import { useMutation } from '@apollo/react-hooks';

const CreateVideoDialog = ({ user, formOpen, setFormOpen, date, displaySnackMessage }) => {
  const [createVideo] = useMutation(CREATE_VIDEO_MUTATION);
  const classes = useFormStyles();
  const {
    handleSubmit, control, setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(videoSchema),
  });

  const handleClose = () => {
    setFormOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      await createVideo({
        variables: {
          ...data,
          datetime: dateToString(data.datetime).slice(0, 10),
        },
      });
      displaySnackMessage('Successfully create video!');
      setFormOpen(false);
    } catch (e) {
      console.log(JSON.stringify(e));
      if (e.message === 'Video already exists') {
        displaySnackMessage(e.message, 'error');
        setError('url', {
          type: 'focus',
          message: 'This video exists!'
        });
      } else {
        displaySnackMessage(e.message, 'error');
      }
    }
  };
  // console.log(errors);

  return (
    <Dialog
      onClose={handleClose}
      open={formOpen}
      fullWidth={true}
      maxWidth='sm'
      PaperProps={{ style: { paddingTop: '0.8rem', paddingBottom: '0.5rem' } }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle onClose={handleClose} disableTypography={true}>
          <Typography variant='h5'>
            新增影片
          </Typography>
        </DialogTitle>
        <DialogContent style={{ height: '380px' }}>
          <Grid container className={classes.gridRoot} spacing={3} alignItems='flex-start'>
            <Grid item xs={12}>
              <Controller
                name="gameName"
                control={control}
                defaultValue=''
                rules={{ required: true }}
                render={({ field }) =>
                  <TextField
                    label='比賽名稱'
                    variant='outlined'
                    fullWidth {...field}
                    error={errors.gameName? true: false}
                    helperText={errors.gameName? errors.gameName.message: ""}
                  />}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="gameType"
                control={control}
                defaultValue=''
                rules={{ required: true }}
                render={({ field }) =>
                  <TextField
                    label='比賽類別 (ex: 男單)'
                    variant='outlined'
                    fullWidth {...field}
                    error={errors.gameType? true: false}
                    helperText={errors.gameType? errors.gameType.message: ""}
                  />}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="datetime"
                control={control}
                defaultValue={dateToString(new Date()).slice(0, 10)}
                rules={{ required: true }}
                render={({ field }) =>
                  <KeyboardDatePicker
                    onChange={field.onChange}
                    label="比賽日期"
                    format="yyyy-MM-DD"
                    inputVariant='outlined'
                    error={errors.datetime? true: false}
                    value={field.value}
                    helperText={errors.datetime? errors.datetime.message: ""}
                  />}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                defaultValue=''
                render={({ field }) =>
                  <TextField
                    multiline
                    rowsMax={3}
                    label='Description'
                    variant='outlined'
                    fullWidth {...field}
                    error={errors.description? true: false}
                    helperText={errors.description? errors.description.message: ""}
                  />}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="url"
                control={control}
                defaultValue='https://www.youtube.com/watch?v='
                rules={{ required: true }}
                render={({ field }) =>
                  <TextField
                    label='影片網址 (Youtube)'
                    variant='outlined'
                    fullWidth {...field}
                    error={errors.url? true: false}
                    helperText={errors.url? errors.url.message: ""}
                  />}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type='submit' variant='contained' color="primary">
            Create
          </Button>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateVideoDialog;
