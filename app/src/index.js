import React from 'react';
import ReactDOM from 'react-dom';
import Home from './modules/home';

import { Provider } from 'react-redux';
import configureStore from './reducers/store.config';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Home />
    </Provider>
    , document.getElementById('root'));
