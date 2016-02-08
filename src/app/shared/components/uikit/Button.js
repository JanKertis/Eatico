/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */

import React, { Component, PropTypes } from 'react';
import styles from './Button.css';
import classNames from 'classnames';

export default class Button extends Component {
    render() {
        return (
            <button onClick={ this.props.onclick } className={ classNames(styles.button, this.props.styles) }>{ this.props.children }</button>
        );
    }
}

Button.propTypes = {
    onclick: PropTypes.func,
    styles: PropTypes.string,
    children: PropTypes.string
};
