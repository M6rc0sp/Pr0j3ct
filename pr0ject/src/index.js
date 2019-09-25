import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import blog from './components/blog/blog';
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

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <PrivateRoute path="/admin" component={manager} />
      <Route path="/blog" component={blog} />
      <Route path="/login" component={login} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));