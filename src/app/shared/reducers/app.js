/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */

import { Map, OrderedMap, fromJS } from 'immutable';

export default function front(state = Map({ venuesModal: false }), action) {
    switch (action.type) {
        case 'OPEN_MODAL':
            return state.set(action.modal, true).setIn(['data', action.modal], action.data);
        case 'CLOSE_MODAL':
            return state.set(action.modal, false);
        default:
            return state;
    }
}
