/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './shared/containers';
import { createHashHistory, useBasename } from 'history';
import { createRoutex } from 'routex';
import { createRedux, routes } from './shared';

const routex = createRoutex(routes, createHashHistory() );
const store = createRedux(undefined, routex);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('App')
);
