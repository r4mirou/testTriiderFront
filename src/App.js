import React from 'react';
import Routes from './config/routes';
import './default.css';
import { Provider } from 'react-redux';
import store from './fluxArchiteture/store/store'

const App = () =>
    <Provider store={store}>
        <Routes />
    </Provider>

export default App;
