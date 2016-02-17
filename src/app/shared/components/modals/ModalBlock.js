/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeModal } from './../../actions';
import { VenuesModal } from './';
import { VelocityTransitionGroup } from 'velocity-react';

export default class ModalBlock extends Component {
    closeModal() {
        this.props.closeModal('venuesModal');
    }

    render() {
        return (
            <div>
                <VelocityTransitionGroup enter={{animation: "fadeIn", duration: 100}} leave={{ animation: "fadeOut", duration: 100 }}>
                    { this.props.venuesModal && <VenuesModal onClose={ this.closeModal.bind(this) } /> }
                </VelocityTransitionGroup>
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
            venuesModal: state.app.get('venuesModal')
        };
    },
    (dispatch) => {
        return bindActionCreators({ closeModal }, dispatch);
    }
)(ModalBlock);
