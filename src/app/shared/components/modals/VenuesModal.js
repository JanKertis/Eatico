/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal, Map } from './../uikit';

export default class VenuesModal extends Component {
    render() {
        return (
            <Modal onClose={ this.props.onClose }>
                <div>
                    <h3>{ this.props.data.get('place') }</h3>
                    <address>{ this.props.data.get('address') }</address>
                    <div>
                        <h4>Hodnotenia</h4>
                        { this.props.data.get('votes').toArray().map((item, i) => {
                            return (
                                <span key={ i }>{ item.get('item') } : { item.get('votes') } </span>
                            )
                        }) }
                        <Map key={ this.props.data.get('place') } lat={ this.props.data.get('lat') } lng={ this.props.data.get('lng') } />
                    </div>
                </div>
            </Modal>
        );
    }
}

VenuesModal.propTypes = {
    onClose: PropTypes.func.isRequired
};

export default connect(
    (state) => {
        return {
            data: state.app.getIn(['data', 'venuesModal'])
        };
    }
)(VenuesModal);
