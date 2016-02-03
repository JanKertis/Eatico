/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */

import { SEARCH_ITEMS_REQUEST, SEARCH_ITEMS_SUCCESS, SEARCH_ITEMS_FAILURE, SEARCH_VENUES_REQUEST, SEARCH_VENUES_SUCCESS, SEARCH_VENUES_FAILURE } from './../constants/actionTypes';
import { Map, OrderedMap, fromJS } from 'immutable';

export default function front(state = Map({ isLoading: false, results: OrderedMap(), error: null }), action) {
    switch (action.type) {
        case SEARCH_ITEMS_REQUEST:
            return state.set('isLoading', true);
        case SEARCH_ITEMS_SUCCESS:
            const results = action.result.body.response.venues;
            return state.set('isLoading', false).set('results',  Map(results.map((result) => [result.id, Map(fromJS(result))])));
        case SEARCH_ITEMS_FAILURE:
            return state.set('isLoading', false).set('error', action.error);
        case SEARCH_VENUES_REQUEST:
            return state.set('isLoading', true);
        case SEARCH_VENUES_SUCCESS:
            const venues = action.result.body.response.venues;
            return state.set('isLoading', false).set('venues',  Map(venues.map((result) => [result.id, Map(fromJS(result))])));
        case SEARCH_VENUES_FAILURE:
            return state.set('isLoading', false).set('error', action.error);
        default:
            return state;
    }
}
