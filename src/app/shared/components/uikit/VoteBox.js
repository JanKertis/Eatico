import React, { Component, PropTypes } from 'react';
import styles from './VoteBox.css';
import classNames from 'classnames';

export default class VoteBox extends Component {
    constructor (props) {
        super(props);
        this.state = { hovered: false };
    };
    
    hoverHandler() {
        this.setState({ hovered: true });
    }
    
    hoverReset() {
        this.setState({ hovered: false });
    }
    
    render() {
        return (
            <span
                className={ classNames(styles.resultVotes, styles.first) }
                onMouseEnter={ this.hoverHandler.bind(this) }
                onMouseLeave={ this.hoverReset.bind(this) }
                onClick={ this.props.onClick }
                title={ this.props.title }>
                { this.state.hovered && <span className={ styles.counter }>+1</span> }
                { <span className={ classNames(this.state.hovered && styles.hidden) } >{ this.props.children }</span> }
            </span>  
        );
    }
}

VoteBox.propTypes = {
    onClick: PropTypes.func,
    title: PropTypes.string,
    children: PropTypes.string
};
