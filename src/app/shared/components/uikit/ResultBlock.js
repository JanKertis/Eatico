/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */

import React from 'react';
import styles from './ResultBlock.css';
import { connect } from 'react-redux';

export default class ResultsBlock extends React.Component {
    render() {
        return (
            <div>
                {this.props.results.toArray().map((result, i) => {
                    return (
                        <div id={ i } className={styles.resultRow} key={ i }>
                            <span className={styles.resultVotes}>0</span>
                            <div className={styles.resultInfo}>
                                <span className={styles.resultPlace} title={ result.get('name') }>{ result.get('name') }</span>
                                <span className={styles.resultStreet} title={ result.get('location').get('address') }>{ result.get('location').get('address') }</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            results: state.front.get('results')
        };
    }
)(ResultsBlock);
