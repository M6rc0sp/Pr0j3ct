import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import manager from './components/manager/manager'
import login from './components/signin/login'
import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
);

const routing = () => (
<Router>
  <Switch>
   <Route exact path="/" component={App}/>
   <Route path="/admin" component={manager} />
   <Route path="/login" component={login} />
   <Route path="*" component={() => <h1>Page not found</h1>} />
  </Switch>
</Router>
)

export default routing;