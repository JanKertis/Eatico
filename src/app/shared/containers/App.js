/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View } from 'routex/lib/react';
import normalize from './normalize.css';

export default class App extends Component {
    render() {
        return (
            <View />
        );
    }
}
