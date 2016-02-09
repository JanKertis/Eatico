/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */

import React, { Component, PropTypes } from 'react';
import styles from './Modal.css';

export default class Modal extends Component {
    componentDidMount() {
        this.clickHandler = this.clickHandler.bind(this);
        window.addEventListener('click', this.clickHandler, true);
        document.documentElement.className = styles.modalOpen;
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.clickHandler, true);
        document.documentElement.className = '';
    }

    clickHandler(e) {
        if (!this._modal.contains(e.target)) {
            this.props.onClose();
        }
    }

    render() {
        return (
            <div className={ styles.modal }>
                <div className={ styles.modalBg }>
                    <div className={ styles.innerBox } >
                        <div className={ styles.modalBox } ref={ (modal) => this._modal = modal }>
                            <div className={ styles.modalBody }>
                                <button className={ styles.modalCloseButton } onClick={ this.props.onClose }>
                                    <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                                        <path d="M0 0h24v24H0z" fill="none"/>
                                    </svg>
                                </button>
                                { this.props.children }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    onClose: PropTypes.func
};
