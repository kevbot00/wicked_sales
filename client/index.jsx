import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link, Switch, withRouter, HashRouter } from "react-router-dom";

ReactDOM.render(
  <HashRouter><App/></HashRouter>,
  document.querySelector('#root')
);
