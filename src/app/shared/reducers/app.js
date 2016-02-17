/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */

import { Map, OrderedMap, fromJS } from 'immutable';
import {
    VOTE_UP_REQUEST,
    VOTE_UP_SUCCESS,
    VOTE_UP_FAILURE
} from './../constants/actionTypes';

export default function front(state = Map({ venuesModal: false }), action) {
    switch (action.type) {
        case 'OPEN_MODAL':
            return state.set(action.modal, true).setIn(['data', action.modal], action.data);
        case 'CLOSE_MODAL':
            return state.set(action.modal, false);
        case VOTE_UP_REQUEST:
            return state.set('isLoading', true);
        case VOTE_UP_SUCCESS: {
            const place = action.result.body.place;
            const item = action.result.body.item;
            return state.withMutations((newState) => {
                newState
                    .set('isLoading', false)
                    .setIn(['data', 'venuesModal', 'votes', item, 'votes'], state.getIn(['data', 'venuesModal', 'votes', item, 'votes']) + 1);
            });
        }
        case VOTE_UP_FAILURE:
            return state.set('isLoading', false).set('error', action.error);
        default:
            return state;
    }
}
