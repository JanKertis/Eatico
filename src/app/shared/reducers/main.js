/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */

import {
    SEARCH_ITEMS_REQUEST,
    SEARCH_ITEMS_SUCCESS,
    SEARCH_ITEMS_FAILURE,
    SEARCH_VENUES_REQUEST,
    SEARCH_VENUES_SUCCESS,
    SEARCH_VENUES_FAILURE,
    SEARCH_FOOD_REQUEST,
    SEARCH_FOOD_SUCCESS,
    SEARCH_FOOD_FAILURE,
    ADD_PLACE_REQUEST,
    ADD_PLACE_SUCCESS,
    ADD_PLACE_FAILURE,
    VOTE_UP_REQUEST,
    VOTE_UP_SUCCESS,
    VOTE_UP_FAILURE
} from './../constants/actionTypes';
import { Map, OrderedMap, fromJS } from 'immutable';

const initialState = Map({
    isLoading: false,
    results: OrderedMap(),
    venues: OrderedMap(),
    venuesModal: false,
    food: OrderedMap(),
    error: null
});

export default function main(state = initialState, action) {
    switch (action.type) {
        case 'OPEN_MODAL':
            return state.set(action.modal, true).setIn(['data', action.modal], action.venue);
        case 'CLOSE_MODAL':
            return state.set(action.modal, false);
        case SEARCH_ITEMS_REQUEST:
            return state.set('isLoading', true);
        case SEARCH_ITEMS_SUCCESS:
            const results = action.result.body;
            const idMap = results.idMap;
            const places = results.places;
            let response = [];

            for (const place in places) {
                if (places.hasOwnProperty(place)) {
                    if (places[place]['votes'].hasOwnProperty(action.item)) {
                        response.push(places[place]);
                    }
                }
            }

            return state.withMutations((newState) => {
                newState
                    .set('isLoading', false)
                    .set('item', fromJS(action.item))
                    .setIn(['results', action.item], Map(response.map((val) => [val.id, fromJS(val)])))
                    .updateIn(['results', action.item], (s) => s.sortBy((p) => p.getIn(['votes', action.item, 'votes'])).reverse());
            });
        case SEARCH_ITEMS_FAILURE:
            return state.set('isLoading', false).set('error', action.error);
        case SEARCH_VENUES_REQUEST:
            return state.set('placeIsLoading', true);
        case SEARCH_VENUES_SUCCESS:
            const venues = action.result.body.response.venues;
            return state.set('placeIsLoading', false).set('venues',  Map(venues.map((result) => [result.id, Map(fromJS(result))])));
        case SEARCH_VENUES_FAILURE:
            return state.set('placeIsLoading', false).set('error', action.error);
        case SEARCH_FOOD_REQUEST:
            return state.set('foodIsLoading', true);
        case SEARCH_FOOD_SUCCESS:
            const food = action.result.body.food;
            return state.set('foodIsLoading', false).set('food',  Map(fromJS(food)));
        case SEARCH_FOOD_FAILURE:
            return state.set('foodIsLoading', false).set('error', action.error);
        case ADD_PLACE_REQUEST:
            return state.set('isLoading', true);
        case ADD_PLACE_SUCCESS: {
            const place = action.result.body.place;
            const item = action.result.body.item;
            return state.withMutations((newState) => {
                newState
                    .set('isLoading', false)
                    .setIn(['results', item, place.id],  Map(fromJS(place)))
                    .updateIn(['results', item], (s) => s.sortBy((p) => p.getIn(['votes', item, 'votes'])).reverse());
            });
        }
        case ADD_PLACE_FAILURE:
            return state.set('isLoading', false).set('error', action.error);
        case VOTE_UP_REQUEST:
            return state.set('isLoading', true);
        case VOTE_UP_SUCCESS: {
            const place = action.result.body.place;
            const section = action.result.body.section;
            const item = action.result.body.item;

            return state
                    .set('isLoading', false)
                    .setIn(['results', section, place, 'votes', item, 'votes'], state.getIn(['results', section, place, 'votes', item, 'votes']) + 1)
                    .updateIn(['results', section], (s) => s.sortBy((p) => p.getIn(['votes', section, 'votes'])).reverse());
        }
        case VOTE_UP_FAILURE:
            return state.set('isLoading', false).set('error', action.error);
        default:
            return state;
    }
}
