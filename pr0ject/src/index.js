import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import manager from './components/manager/manager'
import signup from './components/signup/index'
import signin from './components/signin/index'
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

const routing = (
<Router>
  <Switch>
   <Route exact path="/" component={App}/>
   <PrivateRoute path="/manager" component={manager}/>
   <Route path="/admin" component={signup} />
   <Route path="/login" component={signin} />
   <Route path="*" component={() => <h1>Page not found</h1>} />
  </Switch>
</Router>
)

ReactDOM.render(routing, document.getElementById('root'));