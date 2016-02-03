/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */

import React, { Component, PropTypes } from 'react';
import styles from './InputDropDown.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export default class InputDropDown extends Component {
    render() {
        return (
            <div className={ styles.resultBox }>
                <nav className={ styles.nav }>
                    <ul className={ styles.ul }>
                        { this.props.children }
                    </ul>
                </nav>
            </div>
        );
    }
}
