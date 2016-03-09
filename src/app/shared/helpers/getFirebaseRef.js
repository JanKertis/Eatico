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
    return new Firebase("https://eatico.firebaseio.com/");
}
