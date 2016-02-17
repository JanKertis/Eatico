/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */

import { VOTE_UP_REQUEST, VOTE_UP_SUCCESS, VOTE_UP_FAILURE } from './../constants/actionTypes';
import { getFirebaseRef, slugify } from './../helpers';

/**
 * add new place action
 *
 * @param {Object} data
 * @returns {{types: *[], promise: Request}}
 */
export default function voteUp(place, item) {
    const firebase = getFirebaseRef();
    const placeRef = firebase.child('place').child(slugify(place));

    return {
        types: [VOTE_UP_REQUEST, VOTE_UP_SUCCESS, VOTE_UP_FAILURE],
        promise: new Promise((resolve) => {
            try {
                let votes;
                let countVotes;

                placeRef.child('votes').transaction((currentRank) => {
                    votes = currentRank || { };
                });

                placeRef.child('votes').child(slugify(item)).child('votes').transaction((currentRank) => {
                    return currentRank + 1;
                });

                resolve({ body: { place, item: slugify(item) } });
            }
            catch(e) {
                console.log(e);
                throw e;
            }

        })
    }
}
