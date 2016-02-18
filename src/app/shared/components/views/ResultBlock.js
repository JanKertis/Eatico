/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */

import React, { Component, PropTypes } from 'react';
import styles from './ResultBlock.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { openModal, voteUp } from './../../actions';
import classNames from 'classnames';

export default class ResultsBlock extends Component {
    openModal(e, venue) {
        if (!(e.target.tagName === 'BUTTON')) {
            this.props.openModal('venuesModal', venue);
        }
    }

    voteUp(place, item) {
        this.props.voteUp(place, item, item);
    }

    render() {
        return (
            <div>
                { this.props.results && this.props.results.toArray().map((result, i) => {
                     return (
                        <div className={styles.resultRow} title={ result.get('place') } onClick={ (e) => this.openModal(e, result.get('id')) } key={ i }>
                            <span className={ classNames(styles.resultVotes, i === 0 && styles.first) }>
                                { result.getIn(['votes', this.props.item, 'votes']) }
                            </span>
                            <div className={styles.resultInfo}>
                                <span className={styles.resultPlace}>{ result.get('place') }</span>
                                <span className={styles.resultStreet}>{ result.get('address') }</span>
                                <button
                                    className={ styles.voteButton }
                                    onClick={ this.voteUp.bind(this, result.get('id'), this.props.item) }
                                    title={ `Hlasovať za položku ${ this.props.item } v podniku ${ result.get('place') }` }>
                                    +1
                                </button>
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
            results: state.main.getIn(['results', state.main.get('item')]),
            item: state.main.get('item')
        };
    },
    (dispatch) => {
        return bindActionCreators({ openModal, voteUp }, dispatch);
    }
)(ResultsBlock);
