/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */

import React, { Component, PropTypes } from 'react';
import styles from './RightNav.css';
import classNames from 'classnames';
import { AddPlaceForm } from './../forms';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export default class RightNav extends React.Component {
    render() {
        return (
            <div className={ classNames(styles.rightNav, this.props.active ? styles.active : null) }>
                <AddPlaceForm />
            </div>
        );
    }
}

RightNav.propTypes = {
    active: PropTypes.bool
};
