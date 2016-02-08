/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */

import React, { Component, PropTypes } from 'react';
import styles from './Front.css';
import { Button, ResultBlock, RightNav } from './../uikit';
import classNames from 'classnames';
import { ModalBlock } from './../modals';
import { searchItems, searchFood } from './../../actions';
import ReactSelectStyles from './ReactSelect.less';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';

class Front extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            showNav: false,
            selectedFood: ''
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

    onFoodChange(value) {
        this.props.searchItems(value.label);
        this.setState({ active: true });
        this.setState({ selectedFood: value });
    }

    render() {
        const getFoodOptions = (input, callback) => {
            const options = [];
            this.props.searchFood(input);

            this.props.food.toArray().map((food, i) => {
                options.push({ value: `${i}`+food.get('slug'), label: food.get('item') });
            });

            var data = {
                options: options
            };

            setTimeout(() => {
                callback(null, data);
            }, 300);
        };

        return (
            <div className={ styles.appBody }>
                <ModalBlock />
                <div ref={ (nav) => this._nav = nav }>
                    <RightNav active={ this.state.showNav } onClose={ this.toggleNav.bind(this) } />
                </div>
                <div className={ classNames(styles.topWrapper, this.state.active ? styles.activeWrapper : null) }>
                    <div className={ styles.textCenter }>
                        <div className={ classNames(styles.finderBlock, this.state.active ? styles.activeBlock : null) }>
                            <span className={ styles.finderText }>Kde je top</span>
                            <Select.Async
                                className="Front"
                                name="item-select"
                                valueKey="value"
                                labelKey="label"
                                value={ this.state.selectedFood }
                                placeholder="pečená kačka"
                                noResultsText="Žiadne výsledky"
                                searchingText="Hľadám"
                                clearable={ false }
                                loadOptions={ getFoodOptions }
                                onChange={ this.onFoodChange.bind(this) }
                            />
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

Front.propTypes = {
    searchItems: PropTypes.func.isRequired,
    searchFood: PropTypes.func.isRequired,
    food: PropTypes.object,
    isLoading: PropTypes.bool
};

export default connect(
    (state) => {
        return {
            food: state.front.get('food'),
            isLoading: state.front.get('isLoading')
        };
    },
    (dispatch) => {
        return bindActionCreators({ searchItems, searchFood }, dispatch);
    }
)(Front);
