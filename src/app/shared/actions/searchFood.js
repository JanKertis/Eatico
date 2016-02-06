/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */
import { SEARCH_FOOD_REQUEST, SEARCH_FOOD_SUCCESS, SEARCH_FOOD_FAILURE } from './../constants/actionTypes';
import { getFirebaseRef, slugify } from './../helpers';

/**
 * search food action
 *
 * @param {String} item
 * @returns {{types: *[], promise: Request}}
 */
export default function searchFood(item) {
    return {
        types: [SEARCH_FOOD_REQUEST, SEARCH_FOOD_SUCCESS, SEARCH_FOOD_FAILURE],
        promise: new Promise((resolve) => {
            const firebase = getFirebaseRef();
            const foodRef = firebase.child('food');

            let food = [];

            foodRef.on('value', (snapshot) => food = snapshot.val());

            resolve({
                body: {
                    food, item: slugify(item)
                }
            })
        })
    }
}
