/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */

import {
    OPEN_MODAL,
    CLOSE_MODAL
} from './../constants/actionTypes';
import { Map, OrderedMap, fromJS } from 'immutable';

const initialState = Map({
    venuesModal: false
});

export default function app(state = initialState, action) {
    switch (action.type) {
        case OPEN_MODAL:
            return state.set(action.modal, true).setIn(['data', action.modal], action.venue);
        case CLOSE_MODAL:
            return state.set(action.modal, false);
        default:
            return state;
    }
}
