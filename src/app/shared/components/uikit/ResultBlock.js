/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */

import React, { Component, PropTypes } from 'react';
import styles from './ResultBlock.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { openModal } from './../../actions';

export default class ResultsBlock extends Component {
    openModal(venue) {
        this.props.openModal('venuesModal', venue);
    }

    render() {
        return (
            <div>
                { this.props.results && this.props.results.toArray().map((result, i) => {
                     return (
                        <div className={styles.resultRow} title={ result.get('place') } onClick={ this.openModal.bind(this, result) } key={ i }>
                            <span className={styles.resultVotes}>{ result.getIn(['votes', this.props.item, 'votes']) }</span>
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

ResultsBlock.propTypes = {
    results: PropTypes.object
};

export default connect(
    (state) => {
        return {
            results: state.front.getIn(['results', state.front.get('item')]),
            item: state.front.get('item')
        };
    },
    (dispatch) => {
        return bindActionCreators({ openModal }, dispatch);
    }
)(ResultsBlock);
