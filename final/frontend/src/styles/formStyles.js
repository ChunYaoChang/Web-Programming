import { makeStyles } from '@material-ui/core/styles';

export const useFormStyles = makeStyles({
  paperRoot: {
    paddingTop: '1.2rem',
    paddingBottom: '1.2rem',
    paddingLeft: '1vw',
    paddingRight: '1vw',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2.3rem',
  },
  settingPaperRoot: {
    paddingTop: '1.5rem',
    paddingBottom: '1.3rem',
    paddingLeft: '1.2rem',
    paddingRight: '1.2rem',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '0rem',
  },
  gridRoot: {
    padding: 20,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  checkbox: {
    paddingLeft: 0,
  },
});
