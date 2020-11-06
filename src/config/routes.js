import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { isAuthenticated } from './auth'

import Login from '../views/login'
import Calendar from '../views/calendar'
import Service from '../views/services'
import NotFound from '../views/404'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated()
            ? (<Component {...props} />)
            : (<Redirect to={{ pathname: '/', state: { from: props.location } }} />)
    )} />
)

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={() => <Login />} />            
            <PrivateRoute exact path='/calendar' component={() => <Calendar />} />
            <PrivateRoute exact path='/scheduling' component={() => <Service />} />
            
            <Route path="*" component={() => <NotFound />} />
        </Switch>
    </BrowserRouter>
)

export default Routes;