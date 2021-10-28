import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ isAuth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(_props) => {
        if (isAuth.login) {
          return <Component />;
        } else {
          return <Redirect to={'/login'} />;
        }
      }}
    />
  );
};

const LoginProtected = ({ isAuth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(_props) => {
        if (isAuth.login) {
          return <Redirect to={'/'} />;
        } else {
          return <Component />;
        }
      }}
    />
  );
};

export { ProtectedRoute, LoginProtected };
