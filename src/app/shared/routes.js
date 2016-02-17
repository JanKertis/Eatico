/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */

import { App } from './components';
import { Main } from './components/views';

/**
 * Creates on enter handler which dispatches action created by given action creator (or creators if multiple params)
 *
 * @param {Function} actionCreator
 */

function onEnterHandler(actionCreator) {
    const creators = [];

    for (let i = 0; i < arguments.length; i++) {
        creators.push(arguments[i]);
    }

    return (currentRoute, nextRoute, router, dispatch) => {
        if (creators.length > 1) {
            return Promise.all(
                creators.map(creator => dispatch(creator()))
            );
        }

        return dispatch(actionCreator());
    };
}

const AppRoutes = [
    {
        path: '',
        component: Main
    }
];

export default [
    {
        path: '',
        component: App,
        children: AppRoutes
    }
];
