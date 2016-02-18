/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Map } from './../uikit';
import classNames from 'classnames';
import styles from './VenuesModal.css';
import { slugify } from './../../helpers';
import { voteUp } from './../../actions';

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

    voteUp(place, section, item) {
        this.props.voteUp(place, section, item);
        this.context.addNotification({
            title: 'Ďakujeme za Váš názor',
            message: `Váš hlas za TOP ${ this.props.results.get(this.props.item).get(this.props.venue).get('votes').get(slugify(item)).get('item') } bol pripísaný reštaurácií ${ this.props.results.get(this.props.item).get(this.props.venue).get('place') }`,
            autoDismiss: 10,
            level: 'info'
        });
    }

    render() {
        const place = this.props.results.get(this.props.item).get(this.props.venue);

        return (
            <Modal onClose={ this.props.onClose }>
                <div>
                    <h3 title={ place.get('place') }>{ place.get('place') }</h3>
                    <address title={ place.get('address') }>{ place.get('address') }</address>
                    <div>
                        <h4>Hodnotenia</h4>
                        <div className={ styles.votesBlock }>
                            { place.get('votes').toArray().map((item, i) => {
                                return (
                                    <div className={ classNames(styles.votesRow, this.props.item === slugify(item.get('item')) && styles.active) } key={ i }>
                                        { item.get('item') }: { item.get('votes') } { this.getKey(item.get('votes')) }
                                        <button
                                            className={ styles.voteButton }
                                            onClick={ this.voteUp.bind(this, place.get('id'), this.props.item, item.get('item')) }
                                            title={ `Hlasovať za položku ${ item.get('item') } v podniku ${ place.get('place') }` }>
                                            Hlasovať
                                        </button>
                                    </div>
                                )
                            }) }
                        </div>
                        <Map key={ place.get('place') } lat={ place.get('lat') } lng={ place.get('lng') } />
                    </div>
                </div>
            </Modal>
        );
    }
}

VenuesModal.contextTypes = {
    addNotification: PropTypes.func.isRequired
};

VenuesModal.propTypes = {
    onClose: PropTypes.func.isRequired
};

export default connect(
    (state) => {
        return {
            venue: state.app.getIn(['data', 'venuesModal']),
            results: state.main.get('results'),
            item: state.main.get('item')
        };
    },
    (dispatch) => {
        return bindActionCreators({ voteUp }, dispatch);
    }
)(VenuesModal);
