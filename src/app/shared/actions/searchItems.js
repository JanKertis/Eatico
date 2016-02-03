/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */
import request from 'superagent-bluebird-promise';
import { SEARCH_ITEMS_REQUEST, SEARCH_ITEMS_SUCCESS, SEARCH_ITEMS_FAILURE } from './../constants/actionTypes';
import { CLIENT_ID, CLIENT_SECRET } from './../constants/foursquareClient';

/**
 * search items action
 *
 * @param {String} item
 * @returns {{types: *[], promise: Request}}
 */
export default function searchItems(item) {

    const req = request.get(`https://api.foursquare.com/v2/venues/search?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20130815&near=Bratislava&query=${item}`);
    return {
        types: [SEARCH_ITEMS_REQUEST, SEARCH_ITEMS_SUCCESS, SEARCH_ITEMS_FAILURE],
        promise: req
    }
}
