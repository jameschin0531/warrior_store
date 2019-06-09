import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';

import Home from './components/Home/Home';

import Rule from './components/HelloWorld/HelloWorld';

import Product from './components/Product/product';
import Profile from './components/Profile/profile';
import Slider from './components/Slider/slider'

import OrderList from './components/OrderList/orderlist'

import './styles/styles.scss';

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/rule" component={Rule}/>
        <Route path="/home" component={Slider}/>
        <Route path="/product" component={Product}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/order" component={OrderList}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
