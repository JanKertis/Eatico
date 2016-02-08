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
                            { this.props.children }
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
