import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory, browserHistory } from "react-router";
import routes from './routes';

const app = document.getElementById('app');
ReactDOM.render(<Router history={browserHistory} routes={routes} />, app);


