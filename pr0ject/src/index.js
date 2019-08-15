import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import login from './components/login/login';


const routing = (
<Router>
  <div>
   <Route exact path="/" component={App}/>
   <Route path="/login" component={login}/>
  </div>
</Router>
)

ReactDOM.render(routing, document.getElementById('root'));