import './App.css';
import Home from './containers/Home';
import Login from './containers/Login';
import Register from './containers/Register';
import Page404 from './components/Page404';
import Page500 from './components/Page500';
import AccountSetting from './containers/AccountSetting';
import Calendar from './containers/Calendar';
import Video from './containers/Video';
import AccountVerification from './containers/AccountVerification';
import LoggedInMenuWrapper from './components/LoggedInMenuWrapper';
import SuccessfullLogout from './components/SuccessfullLogout';
import SuccessfullLogin from './components/SuccessfullLogin';
import SuccessfullRegister from './components/SuccessfullRegister';
import Base from './components/Base';
import ProtectedRoute from './components/ProtectedRoute';
import { useState, useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { useAsync } from 'react-async-hook';
import { useMutation } from '@apollo/react-hooks';
import { GET_USER_BY_ID_MUTATION } from './graphql';
import {
  Switch,
  Route,
} from "react-router-dom";
import {
  Typography,
} from '@material-ui/core';

function App() {
  // check login status
  const [cookies] = useCookies(['userId', 'reRender']);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnaceSeverity] = useState('info');
  const [getUserById] = useMutation(GET_USER_BY_ID_MUTATION);

  const displaySnackMessage = useCallback(
    (message, severity='info') => {
      setSnackOpen(true);
      setSnackMessage(message);
      setSnaceSeverity(severity);
    },
    [],
  );

  const checkLogin = useCallback(
    async (cookies) => {
      if (cookies.userId) {
        try {
          const result = await getUserById({
            variables: {
              id: cookies.userId,
            },
          });
          return {
            status: true,
            user: result.data.getUserById,
          };
        } catch (e) {
          console.log(JSON.stringify(e));
          if (e.message === 'Failed to fetch') {
            displaySnackMessage('Cannot connect to server!', 'error');
          } else {
            displaySnackMessage(e.message, 'error');
          }
          return {
            status: false,
            user: null,
          }
        }
      } else {
        // no cookies
        return {
          status: false,
          user: null,
        };
      }
    },
    [displaySnackMessage, getUserById],
  );

  const loginPayload = useAsync(checkLogin, [cookies]);

  if (loginPayload.loading) {
    return (
      <Base>
        <Typography>Loading...</Typography>
      </Base>
    );
  } else if (loginPayload.error) {
    return (
      <Base>
        <Typography>Error...</Typography>
      </Base>
    );
  }

  const loggedIn = loginPayload.result.status;

  return (
    <Base
      loginPayload={loginPayload.result}
      snackOpen={snackOpen}
      snackMessage={snackMessage}
      setSnackOpen={setSnackOpen}
      snackSeverity={snackSeverity}
    >
      <Switch>
        <Route exact path='/'>
          <Home loginPayload={loginPayload.result} displaySnackMessage={displaySnackMessage}/>
        </Route>
        <Route exact path='/serverError'>
          <Page500 />
        </Route>
        <Route
          path='/verified/:key'
          render={(props) => (
            <AccountVerification {...props} displaySnackMessage={displaySnackMessage} />
          )}
        >
        </Route>
        {/* routes for not yet logged in user */}
        <ProtectedRoute exact path='/login' condition={!loggedIn}>
          <Login displaySnackMessage={displaySnackMessage}/>
        </ProtectedRoute>
        <ProtectedRoute exact path='/register' condition={!loggedIn}>
          <Register displaySnackMessage={displaySnackMessage}/>
        </ProtectedRoute>
        <ProtectedRoute exact path='/redirect-to-home-after-logout' condition={!loggedIn}>
          <SuccessfullLogout />
        </ProtectedRoute>
        <ProtectedRoute exact path='/successfullRegister' condition={!loggedIn}>
          <SuccessfullRegister />
        </ProtectedRoute>
        {/* routes for logged in user */}
        <ProtectedRoute exact path='/accountSetting' condition={loggedIn}>
          <LoggedInMenuWrapper>
            <AccountSetting
              user={loginPayload.result.user}
              displaySnackMessage={displaySnackMessage}
            />
          </LoggedInMenuWrapper>
        </ProtectedRoute>
        <ProtectedRoute exact path='/successfullLogin' condition={loggedIn}>
          <SuccessfullLogin />
        </ProtectedRoute>
        <ProtectedRoute exact path='/calendar' condition={loggedIn}>
          <LoggedInMenuWrapper>
            <Calendar user={loginPayload.result.user} displaySnackMessage={displaySnackMessage}/>
          </LoggedInMenuWrapper>
        </ProtectedRoute>
        <ProtectedRoute exact path='/video' condition={loggedIn}>
          <LoggedInMenuWrapper>
            <Video user={loginPayload.result.user} displaySnackMessage={displaySnackMessage}/>
          </LoggedInMenuWrapper>
        </ProtectedRoute>
        {/* add other routing path by <Route path='??'>...</Route> */}
        <Route path='*'>
          <Page404 />
        </Route>
      </Switch>
    </Base>
  );
}

export default App;
