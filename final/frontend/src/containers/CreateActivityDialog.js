import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import {
  KeyboardTimePicker,
} from '@material-ui/pickers'
import { dateToDay, stringToDate, weekDay, mergeDateAndTime, dateToString, dateToTime } from '../core'
import { useForm, Controller } from 'react-hook-form';
import { useFormStyles } from '../styles/formStyles';
import { activitySchema } from '../yupSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { CREATE_ACTIVITY_MUTATION } from '../graphql';
import { useMutation } from '@apollo/react-hooks';

const CreateActivityDialog = ({ user, formOpen, setFormOpen, date, displaySnackMessage }) => {
  const [createActivity] = useMutation(CREATE_ACTIVITY_MUTATION);
  const classes = useFormStyles();
  const {
    handleSubmit, control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(activitySchema),
  });

  const handleClose = () => {
    setFormOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      await createActivity({
        variables: {
          ...data,
          createdUser: user.id,
          participants: (data.participate)? [user.id]: [],
          startDatetime: mergeDateAndTime(date, data.startTime),
          endDatetime: mergeDateAndTime(date, data.endTime),
        },
      });
      displaySnackMessage('Successfully created activity!');
      setFormOpen(false);
    } catch (e) {
      console.log(JSON.stringify(e));
      displaySnackMessage(e.message, 'error');
    }
  };

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
            {`日期: ${dateToDay(date)} 星期${weekDay[stringToDate(date).getDay()]}`}
          </Typography>
        </DialogTitle>
        <DialogContent style={{ minHeight: '300px', height: '340px' }}>
          <Grid container className={classes.gridRoot} spacing={3} alignItems='flex-start'>
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                defaultValue='練球'
                rules={{ required: true }}
                render={({ field }) =>
                  <TextField
                    label='Title'
                    variant='outlined'
                    fullWidth {...field}
                    error={errors.title? true: false}
                    helperText={errors.title? errors.title.message: ""}
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
            <Grid item xs={12} md={6}>
              <Controller
                name="startTime"
                control={control}
                defaultValue={stringToDate(mergeDateAndTime(date, '20:00', true))}
                rules={{ required: true }}
                render={({ field }) =>
                  <KeyboardTimePicker
                    ampm={false}
                    onChange={field.onChange}
                    label="Start time"
                    format="HH:mm"
                    inputVariant='outlined'
                    value={field.value}
                    error={errors.startTime? true: false}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    helperText={errors.startTime? errors.startTime.message: ""}
                  />}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="endTime"
                control={control}
                defaultValue={stringToDate(mergeDateAndTime(date, '22:00', true))}
                rules={{ required: true }}
                render={({ field }) =>
                  <KeyboardTimePicker
                    ampm={false}
                    onChange={field.onChange}
                    label="End time"
                    format="HH:mm"
                    inputVariant='outlined'
                    value={field.value}
                    error={errors.endTime? true: false}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    helperText={errors.endTime? errors.endTime.message: ""}
                  />}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={4} xl={4}>
              <FormControlLabel
                label='我要參加'
                control={
                  <Controller
                    name='participate'
                    control={control}
                    defaultValue={false}
                    render={({ field }) =>
                      <Switch
                        {...field}
                        onChange={(event) => {
                          field.onChange(event);
                        }}
                      />}
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

export default CreateActivityDialog;
