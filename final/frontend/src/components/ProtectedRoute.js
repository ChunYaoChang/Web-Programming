import { Route } from 'react-router-dom';
import Page404 from './Page404';

const ProtectedRoute = (props) => {
  if (!props.condition) {
    return (
      <Route {...props}>
        <Page404 />
      </Route>
    );
  } else {
    return (
      <Route {...props}>
        {props.children}
      </Route>
    );
  }
};

export default ProtectedRoute;
