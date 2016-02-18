/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */
import { OPEN_MODAL } from './../constants/actionTypes';

/**
 * Open modal action
 */
export default function openModal(modal, venue) {
    return {
        type: OPEN_MODAL,
        modal, venue
    }
}
