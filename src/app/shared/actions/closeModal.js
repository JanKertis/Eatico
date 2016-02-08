/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */
import { SEARCH_FOOD_REQUEST, SEARCH_FOOD_SUCCESS, SEARCH_FOOD_FAILURE } from './../constants/actionTypes';
import { getFirebaseRef, slugify } from './../helpers';

/**
 * Open modal action
 */
export default function closeModal(modal) {
    return {
        type: 'CLOSE_MODAL',
        modal
    }
}
