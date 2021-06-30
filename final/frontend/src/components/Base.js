import Header from './Header';
import Footer from './Footer';
import { useMemo, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  Container,
  Grid,
  CssBaseline,
  useMediaQuery,
  Box,
  Snackbar,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import { teal, deepOrange } from '@material-ui/core/colors'

const Base = (props) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [userToggleDarkMode, setUserToggleDarkMode] = useState(true);
  const overrides = useMemo(
    () => {
      return {
        MuiCssBaseline: {
          '@global': {
            '*::-webkit-scrollbar': {
              width: '0.3em'
            },
            '*::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,.3)',
              borderRadius: '5px',
              border: '1px solid transparent'
            }
          }
        }
      };
    },
    [],
  );

  const theme = useMemo(
    () => {
      if (prefersDarkMode || userToggleDarkMode) {
        return createMuiTheme({
          palette: {
            type: 'dark',
            primary: teal,
            secondary: deepOrange,
          },
          overrides,
        });
      } else {
        return createMuiTheme({
          palette: {
            type: 'light',
          },
          overrides,
        });
      }
    },
    [prefersDarkMode, userToggleDarkMode, overrides],
  );



  const handleSnackClose = (event, reason) => {
    props.setSnackOpen(false);
  };


  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={4000}
        open={props.snackOpen}
        message="I love snacks"
        onClose={handleSnackClose}
      >
        <Alert
          onClose={handleSnackClose}
          severity={props.snackSeverity}
          variant='filled'
        >
          {props.snackMessage}
        </Alert>
      </Snackbar>
      <Container fixed style={{ paddingTop: '20px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Router>
              <Header
                userToggleDarkMode={userToggleDarkMode}
                setUserToggleDarkMode={setUserToggleDarkMode}
                loginPayload={props.loginPayload}
              />
              <Box paddingTop={1} paddingX={0} justifyContent="center" alignItems='center' display='flex'>
                {props.children}
              </Box>
              <Footer />
            </Router>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
};

export default Base;
