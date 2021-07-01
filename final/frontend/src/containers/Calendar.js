import ReactCalendar from 'react-calendar';
import '../Calendar.css';
import FullWidthGrid from '../components/FullWidthGrid';
import ActivityDetail from '../components/ActivityDetail';
import CreateActivityDialog from './CreateActivityDialog';
// import CalendarTile from '../components/CalendarTile';
import {
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { ALL_ACTIVITY_QUERY, ACTIVITY_SUBSCRIPTION } from '../graphql';
import { useCallback, useState, useEffect } from 'react';
import { dateToDay, stringToDate } from '../core'
import moment from 'moment';

const Calendar = ({ user, displaySnackMessage }) => {
  document.title = '月曆'
  const { loading, error, data, subscribeToMore } = useQuery(ALL_ACTIVITY_QUERY);
  const [open, setOpen] = useState(false);
  const [activeDay, setActiveDay] = useState('');
  const [formOpen, setFormOpen] = useState(false);

  const getActivityListByDate = useCallback(
    (date) => {
      if (data)
        return data.allActivity.filter((activity) =>
          moment(activity.startDatetime).isSame(date, 'day'));
      else return [];
    },
    [data],
  );

  useEffect(() => {
    try {
      subscribeToMore({
        document: ACTIVITY_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData) return prev;
          return subscriptionData.data.activity;
        }
      })
    } catch (e) {
      console.log(JSON.stringify(e));
      displaySnackMessage(e.message, 'error');
    }
  }, [subscribeToMore, displaySnackMessage]);

  const CalendarTile = useCallback(
    ({ activeStartDate, date, view }) => {
      let activityList = getActivityListByDate(date);
      return (<>
        {activityList.map((a) =>
          <Typography variant='body2' noWrap={true} key={`tile_${a.startDatetime}_${a.endDatetime}_${a.title}`}>
            {a.title}
          </Typography>
        )}
      </>);
    },
    [getActivityListByDate],
  );

  const handleClickDay = useCallback((value, event) => {
      setOpen(true);
      setActiveDay(value);
    },
    [],
  );

  const handleCreate = () => {
    setFormOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) {
    return (<>Loading...</>);
  } else if (error) {
    displaySnackMessage('Error when loading data...', 'error');
    return (<>Error...</>);
  }

  const activeActivity = getActivityListByDate(activeDay);

  return (<>
    <CreateActivityDialog
      user={user}
      formOpen={formOpen}
      setFormOpen={setFormOpen}
      date={activeDay}
      displaySnackMessage={displaySnackMessage}
    />
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth={true}
      maxWidth='sm'
      PaperProps={{ style: { paddingTop: '0.5rem', paddingBottom: '0.5rem' } }}
    >
      <DialogTitle onClose={handleClose}>
        {`${dateToDay(activeDay)} 的活動：`}
      </DialogTitle>
      <DialogContent style={{minHeight: '300px', height: '340px'}}>
        <Grid container spacing={3}>
          {activeActivity.map((a) =>
            <Grid item xs={12} key={`grid_${a.startDatetime}_${a.endDatetime}_${a.title}`}>
              <ActivityDetail
                displaySnackMessage={displaySnackMessage}
                activity={a}
                user={user}
                key={`${a.startDatetime}_${a.endDatetime}_${a.title}`}
              />
            </Grid>
          )}
          {activeActivity.length === 0 && (
            <Grid item xs={12}>
              <Typography gutterBottom>目前沒有活動</Typography>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCreate} variant='contained' color="primary">
          Create
        </Button>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
    <FullWidthGrid compact>
      <Grid item xs={12}>
        <ReactCalendar
          minDetail='year'
          minDate={stringToDate('2021-06-01')}
          tileContent={CalendarTile}
          showNeighboringMonth={false}
          onClickDay={handleClickDay}
        />
      </Grid>
    </FullWidthGrid>
  </>);
};

export default Calendar;
