/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */

import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";
import { default as ScriptjsLoader } from "react-google-maps/lib/async/ScriptjsLoader";

export default class Map extends Component {
    render() {
        let marker = {
            position: {
                lat: this.props.lat,
                lng: this.props.lng
            },
            key: this.props.key
        };

        return (
            <ScriptjsLoader
                hostname={ "maps.googleapis.com" }
                pathname={ "/maps/api/js" }
                query={{ v: `3.exp` }}
                loadingElement={ <div style={{ height: "200px", width: "100%", marginTop: "30px" }}></div> }
                containerElement={ <div {...this.props} style={{ height: "200px", width: "100%", marginTop: "30px" }}></div> }
                googleMapElement={
                        <GoogleMap
                            defaultZoom={ 16 }
                            defaultCenter={{ lat: this.props.lat, lng: this.props.lng }}
                            defaultOptions={{
                              scrollwheel: false
                            }} >
                            <Marker {...marker} />
                        </GoogleMap>
                }
            />
        );
    }
}
