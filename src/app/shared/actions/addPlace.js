/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */

import { ADD_PLACE_REQUEST, ADD_PLACE_SUCCESS, ADD_PLACE_FAILURE } from './../constants/actionTypes';

/**
 * add new place action
 *
 * @param {Object} data
 * @returns {{types: *[], promise: Request}}
 */
export default function addPlace(data) {
    return {
        types: [ADD_PLACE_REQUEST, ADD_PLACE_SUCCESS, ADD_PLACE_FAILURE],
        promise: new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 100)
        })
    }
}
