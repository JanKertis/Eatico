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
                        <div className={styles.resultRow} key={ i }>
                            <span className={styles.resultVotes}>{ result.get(this.props.item) }</span>
                            <div className={styles.resultInfo}>
                                <span className={styles.resultPlace} title={ result.get('place') }>{ result.get('place') }</span>
                                <span className={styles.resultStreet} title={ result.get('address') }>{ result.get('address') }</span>
                            </div>
                        </div>
                    );
                })}
                { this.props.results.size === 0 &&
                    <span className={ styles.noResultText }>Žiadne výsledky</span>
                }
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            results: state.front.get('results'),
            item: state.front.get('item')
        };
    }
)(ResultsBlock);
