/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */

import React, { Component } from 'react';
import styles from './Front.css';
import { Button, ResultBlock, RightNav } from './../uikit';
import classNames from 'classnames';
import { searchItems } from './../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Front extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            showNav: false
        }
    }

    componentDidMount() {
        this.props.searchItems('');
        this.clickHandler = this.clickHandler.bind(this);
        window.addEventListener('mousedown', this.clickHandler, false);
    }

    componentWillUnmount() {
        window.removeEventListener('mousedown', this.clickHandler, false);
    }

    clickHandler(e) {
        (!this._nav.contains(e.target)) && this.setState({ showNav: false });
    }

    inputHandler(e) {
        if(e.target.value.length > 2) {
            this.props.searchItems(e.target.value);
            this.setState({ active: true });
        }
        else {
            this.setState({ active: false })
        }

        e.preventDefault();
    }

    toggleNav() {
        this.setState({ showNav: !this.state.showNav });
    }

    render() {
        return (
            <div className={ styles.appBody }>
                <div ref={ (nav) => this._nav = nav }>
                    <RightNav active={ this.state.showNav } onClose={ this.toggleNav.bind(this) } />
                </div>
                <div className={ classNames(styles.topWrapper, this.state.active ? styles.activeWrapper : null) }>
                    <div className={ styles.textCenter }>
                        <div className={ classNames(styles.finderBlock, this.state.active ? styles.activeBlock : null) }>
                            <span className={ styles.finderText }>Kde je top</span>
                            <input className={ styles.inputFinder } type="text" placeholder="pecena kacka" onChange={ this.inputHandler.bind(this) } />
                            <span className={ styles.finderText }>v Bratislave</span>
                        </div>
                    </div>
                </div>
                <div className={ classNames(styles.results, this.state.active ? null : styles.hide) }>
                    <div className={ styles.resultsBlock }>
                        <Button onclick={ this.toggleNav.bind(this) } styles={ styles.addButton }>Pridať</Button>
                        { this.props.isLoading && <span>Nacitavam...</span> }
                        <ResultBlock />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            isLoading: state.front.get('isLoading')
        };
    },
    (dispatch) => {
        return bindActionCreators({ searchItems }, dispatch);
    }
)(Front);
