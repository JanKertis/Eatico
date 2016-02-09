/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal, Map } from './../uikit';
import classNames from 'classnames';
import styles from './VenuesModal.css';
import { slugify } from './../../helpers';

export default class VenuesModal extends Component {
    getKey(item) {
        if (item === 1) {
            return 'hlas';
        } else if(item > 1 && item < 5) {
            return 'hlasy';
        } else {
            return 'hlasov';
        }
    }

    render() {
        return (
            <Modal onClose={ this.props.onClose }>
                <div>
                    <h3 title={ this.props.data.get('place') }>{ this.props.data.get('place') }</h3>
                    <address title={ this.props.data.get('address') }>{ this.props.data.get('address') }</address>
                    <div>
                        <h4>Hodnotenia</h4>
                        <div className={ styles.votesBlock }>
                            { this.props.data.get('votes').toArray().map((item, i) => {
                                return (
                                    <div className={ classNames(styles.votesRow, this.props.item === slugify(item.get('item')) && styles.active) } key={ i }>{ item.get('item') }: { item.get('votes') } { this.getKey(item.get('votes')) } </div>
                                )
                            }) }
                        </div>
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
            data: state.app.getIn(['data', 'venuesModal']),
            item: state.front.get('item')
        };
    }
)(VenuesModal);
