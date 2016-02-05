/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */

import Firebase from 'firebase';

/**
 * Firebase action
 *
 * @returns {Object}
 */
export default function getFirebaseRef() {
    const firebase = new Firebase("https://eatico.firebaseio.com/");
    return firebase;
}
