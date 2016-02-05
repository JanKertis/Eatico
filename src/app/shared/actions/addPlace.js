/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */

import { ADD_PLACE_REQUEST, ADD_PLACE_SUCCESS, ADD_PLACE_FAILURE } from './../constants/actionTypes';
import { getFirebaseRef, slugify } from './../helpers';

/**
 * add new place action
 *
 * @param {Object} data
 * @returns {{types: *[], promise: Request}}
 */
export default function addPlace(data) {
    const firebase = getFirebaseRef();
    const foodRef = firebase.child('food');
    const placeRef = firebase.child('place').child(slugify(data.place));
    const mapRef = firebase.child('map');

    return {
        types: [ADD_PLACE_REQUEST, ADD_PLACE_SUCCESS, ADD_PLACE_FAILURE],
        promise: new Promise((resolve) => {
            let votes;

            placeRef.child(slugify(data.item)).transaction((currentRank) => {
                votes = currentRank + 1;
            });

            const place = {
                id: slugify(data.place),
                place: data.place,
                slug: slugify(data.place),
                address: data.address,
                [slugify(data.item)]: votes
            };

            const food = {
                id: slugify(data.item),
                item: data.item,
                slug: slugify(data.item)
            };

            foodRef.child(slugify(data.item)).update(food);
            placeRef.update(place);

            resolve({ body: { place, item: slugify(data.item) } });
        })
    }
}
