/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */
import { CLOSE_MODAL } from './../constants/actionTypes';

/**
 * Open modal action
 */
export default function closeModal(modal) {
    return {
        type: CLOSE_MODAL,
        modal
    }
}
