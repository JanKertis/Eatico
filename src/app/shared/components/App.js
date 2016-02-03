/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */

import React, { Component } from 'react';

export default class App extends Component {
    render() {
        return (
            <div>{ this.props.children }</div>
        );
    }
}
