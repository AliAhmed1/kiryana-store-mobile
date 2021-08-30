import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Home from '../screens/Home';
import RegisterStore from '../screens/RegisterStore';
import Login from '../screens/Login';
import Stores from '../screens/Stores';
import StoreDetails from '../screens/StoreDetails';
import AddMenuItems from '../screens/AddMenuItems';
import OrderRequests from '../screens/OrderRequests';
import MyOrders from '../screens/MyOrders';
import MyItems from '../screens/MyItems';
import Dashboard from '../screens/Dashboard/Dashboard'



const customHistory = createBrowserHistory();

// Routes For Navigation
const MyRoutes = () => (
    <Router history={customHistory}>
        <div>
            <Route exact path='/' component={Home}></Route>
            <Route path='/register-store' component={RegisterStore}></Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/stores' component={Stores}></Route>
            <Route path='/store-details' component={StoreDetails}></Route>
            <Route path='/add-menu-items' component={AddMenuItems}></Route>
            <Route path='/order-requests' component={OrderRequests}></Route>
            <Route path='/my-orders' component={MyOrders}></Route>
            <Route path='/my-items' component={MyItems}></Route>
            <Route path='/dashboard' component={Dashboard}></Route>
        </div>
    </Router>
)

export default MyRoutes