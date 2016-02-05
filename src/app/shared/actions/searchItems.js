/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */
import { SEARCH_ITEMS_REQUEST, SEARCH_ITEMS_SUCCESS, SEARCH_ITEMS_FAILURE } from './../constants/actionTypes';
import { getFirebaseRef, slugify } from './../helpers';

/**
 * search items action
 *
 * @param {String} item
 * @returns {{types: *[], promise: Request}}
 */
export default function searchItems(item) {
    return {
        types: [SEARCH_ITEMS_REQUEST, SEARCH_ITEMS_SUCCESS, SEARCH_ITEMS_FAILURE],
        promise: new Promise((resolve, reject) => {
            const firebase = getFirebaseRef();
            const placeRef = firebase.child('place');


            let places = [];

            placeRef.on('value', (snapshot) => places = snapshot.val());

            resolve({
                body: {
                    places
                }
            })
        }),
        item: slugify(item)
    }
}
