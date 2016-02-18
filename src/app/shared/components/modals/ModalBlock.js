/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeModal } from './../../actions';
import { VenuesModal } from './';

export default class ModalBlock extends Component {
    closeModal() {
        this.props.closeModal('venuesModal');
    }

    render() {
        return (
            <div>
                { this.props.venuesModal ? <div><VenuesModal onClose={ this.closeModal.bind(this) } /></div> : undefined }
            </div>
        );
    }
}

ModalBlock.propTypes = {
    venuesModal: PropTypes.bool
};

export default connect(
    (state) => {
        return {
            venuesModal: state.main.get('venuesModal')
        };
    },
    (dispatch) => {
        return bindActionCreators({ closeModal }, dispatch);
    }
)(ModalBlock);
