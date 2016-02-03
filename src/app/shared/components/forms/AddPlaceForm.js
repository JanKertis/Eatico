/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */

import React, { Component, PropTypes } from 'react';
import styles from './AddPlaceForm.css';
import { Button } from './../uikit';
import { addPlace } from './../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchVenues } from './../../actions';
import { InputDropDown } from './../uikit';

class AddPlaceForm extends Component {
    constructor(props) {
        super(props);
        this.state = { show: false, error: false };
    }

    componentDidMount() {
        this.clickHandler = this.clickHandler.bind(this);
        window.addEventListener('click', this.clickHandler, true);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.clickHandler, true);
    }

    clickHandler(e) {
        if (!this._placeGroup.contains(e.target)) {
            this.setState({ show: false });
        }
    }

    validate(e) {
        e.preventDefault();

        if (!this._item.value || !this._place.value || !this._address.value) {
            this.setState({ error: true });
        } else {
            this.setState({ error: false });
            this.handleSubmit();
        }
    }

    resetForm() {
        this._item.value = '';
        this._place.value = '';
        this._address.value = '';
    }

    fillData(result) {
        this._place.value = result.get('name');
        this._address.value = result.get('location').get('address');

        this.setState({ show: false });
    }

    findVenues(e) {
        this.props.searchVenues(e.target.value);
    }

    handleSubmit(e) {
        const data = {
            item: this._item.value,
            place: this._place.value,
            address: this._address.value
        };
        this.resetForm();

        console.log(data);
    }

    render() {
        return (
            <form className={ styles.form } onSubmit={ this.validate.bind(this) } autoComplete="off">
                <div className={ styles.formGroup }>
                    <label htmlFor="item">TOP</label>
                    <input name="item" type="text" ref={ (item) => this._item = item } />
                </div>
                <div className={ styles.formGroup } ref={ (pg) => this._placeGroup = pg }>
                    <label htmlFor="place">je v podniku</label>
                    <input name="place" type="text"
                           onChange={ this.findVenues.bind(this) }
                           onFocus={ (e) => this.setState({ show: true }) }
                           ref={ (place) => this._place = place } />

                    { this.state.show &&
                        <InputDropDown>
                            { this.props.venues && this.props.venues.toArray().map((result, i) => {
                                return (
                                    <li onClick={ this.fillData.bind(this, result) } key={i}>{ result.get('name') }</li>
                                );
                            })}
                        </InputDropDown>
                    }
                </div>
                <div className={ styles.formGroup }>
                    <label htmlFor="address">na adrese</label>
                    <input name="address" type="text" ref={ (address) => this._address = address } />
                </div>

                <Button type="submit" onClick={ this.validate.bind(this) } styles={ styles.button }>Pridať</Button>

                { this.state.error && <span className={ styles.formStatus }>Je potrebné vyplniť všetko</span> }
            </form>
        );
    }
}

AddPlaceForm.propTypes = {
    venues: PropTypes.object
};

export default connect(
    (state) => {
        return {
            venues: state.front.get('venues')
        };
    },
    (dispatch) => {
        return bindActionCreators({ searchVenues }, dispatch);
    }
)(AddPlaceForm);
