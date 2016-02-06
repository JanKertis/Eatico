/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */

import React, { Component, PropTypes } from 'react';
import styles from './AddPlaceForm.css';
import ReactSelectStyles from './ReactSelect.less';
import { Button } from './../uikit';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchVenues, searchFood, addPlace } from './../../actions';
import Select from 'react-select';

class AddPlaceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFood: '',
            selectedVenue: '',
            selectedAddress: '',
            error: false
        };
    }

    validate(e) {
        e.preventDefault();

        if (!this.state.selectedFood || !this.state.selectedVenue || !this.state.selectedAddress) {
            this.setState({ error: true });
        } else {
            this.setState({ error: false });
            this.handleSubmit();
        }
    }

    resetForm() {
        this.state.selectedFood = '';
        this.state.selectedVenue = '';
        this.state.selectedAddress = '';
    }

    handleSubmit(e) {
        const data = {
            item: this.state.selectedFood.label,
            place: this.state.selectedVenue.label,
            address: this.state.selectedAddress
        };

        this.props.addPlace(data);
        this.resetForm();
    }


    onFoodChange(value) {
        this.setState({ selectedFood: value });
    }

    onVenueChange(value) {
        this.setState({ selectedVenue: value, selectedAddress: value.address });
    }

    handleAddress(e) {
        this.setState({ selectedAddress: e.target.value });
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

        const getVenuesOptions = (input, callback) => {
            const options = [];
            this.props.searchVenues(input);

            this.props.venues.toArray().map((venue, i) => {
                options.push({ value: `${i}`+venue.get('name'), label: venue.get('name'), address: venue.get('location').get('address') });
            });

            var data = {
                options: options
            };

            setTimeout(() => {
                callback(null, data);
            }, 300)
        };

        return (
            <form className={ styles.form } onSubmit={ this.validate.bind(this) } autoComplete="off">
                <div className={ styles.formGroup } ref={ (fg) => this._foodGroup = fg }>
                    <label htmlFor="item">TOP</label>
                    <Select.Async
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
                </div>
                <div className={ styles.formGroup } ref={ (pg) => this._placeGroup = pg }>
                    <label htmlFor="place">je v podniku</label>
                    <Select.Async
                        name="place-select"
                        valueKey="value"
                        labelKey="label"
                        value={ this.state.selectedVenue }
                        placeholder="Čierny bača"
                        noResultsText="Žiadne výsledky"
                        searchingText="Hľadám"
                        clearable={ false }
                        loadOptions={ getVenuesOptions }
                        onChange={ this.onVenueChange.bind(this) }
                    />
                </div>
                <div className={ styles.formGroup }>
                    <label htmlFor="address">na adrese</label>
                    <input name="address" type="text" placeholder="Mierova 3" value={ this.state.selectedAddress } onChange={ this.handleAddress.bind(this) } />
                </div>

                <Button type="submit" onClick={ this.validate.bind(this) } styles={ styles.button }>Pridať</Button>

                { this.state.error && <span className={ styles.formStatus }>Je potrebné vyplniť všetko</span> }
            </form>
        );
    }
}

AddPlaceForm.propTypes = {
    venues: PropTypes.object,
    foods: PropTypes.object
};

export default connect(
    (state) => {
        return {
            venues: state.front.get('venues'),
            food: state.front.get('food')
        };
    },
    (dispatch) => {
        return bindActionCreators({ searchVenues, searchFood, addPlace }, dispatch);
    }
)(AddPlaceForm);
