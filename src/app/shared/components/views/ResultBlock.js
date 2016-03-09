/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */

import React, { Component, PropTypes } from 'react';
import styles from './ResultBlock.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { VoteBox } from './../uikit';
import { openModal, voteUp } from './../../actions';

export default class ResultsBlock extends Component {
    openModal(e, venue) {
        if (e.target.className.indexOf('VoteBox') < 0) {
            this.props.openModal('venuesModal', venue);
        }
    }

    voteUp(place, item) {
        this.props.voteUp(place, item, item).then(
            this.context.addNotification({
                title: 'Ďakujeme za Váš názor',
                message: `Váš hlas za TOP ${ this.props.results.get(place).get('votes').get(item).get('item') } bol pripísaný reštaurácií ${this.props.results.get(place).get('place')}`,
                autoDismiss: 10,
                level: 'info'
            })
        );
    }

    render() {
        return (
            <div>
                { this.props.results && this.props.results.toArray().map((result, i) => {
                     return (
                        <div className={styles.resultRow} title={ result.get('place') } onClick={ (e) => this.openModal(e, result.get('id')) } key={ i }>
                            <VoteBox
                                onClick={ this.voteUp.bind(this, result.get('id'), this.props.item) }
                                title={ `Hlasovať za položku ${ this.props.item } v podniku ${ result.get('place') }` }>
                                { result.getIn(['votes', this.props.item, 'votes']) }
                            </VoteBox>
                            <div className={styles.resultInfo}>
                                <span className={styles.resultPlace}>{ result.get('place') }</span>
                                <span className={styles.resultStreet}>{ result.get('address') }</span>
                            </div>
                        </div>
                    );
                })}
                { this.props.results && this.props.results.size === 0 &&
                    <span className={ styles.noResultText }>Žiadne výsledky</span>
                }
            </div>
        );
    }
}

ResultsBlock.contextTypes = {
    addNotification: PropTypes.func.isRequired
};

ResultsBlock.propTypes = {
    results: PropTypes.object
};

export default connect(
    (state) => {
        return {
            results: state.main.getIn(['results', state.main.get('item')]),
            item: state.main.get('item')
        };
    },
    (dispatch) => {
        return bindActionCreators({ openModal, voteUp }, dispatch);
    }
)(ResultsBlock);
