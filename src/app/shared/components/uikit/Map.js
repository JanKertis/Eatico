/**
 * @author Ján Kertis <kertis.jan.15@gmail.com>
 * @copyright Ján Kertis, 2016
 */

import React, { Component } from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";
import {default as ScriptjsLoader} from "react-google-maps/lib/async/ScriptjsLoader";

export default class Map extends Component {
    render() {
        const marker = {
            position: {
                lat: this.props.lat,
                lng: this.props.lng
            },
            key: this.props.key,
            defaultAnimation: 2
        };

        return (
            <ScriptjsLoader
                hostname={"maps.googleapis.com"}
                pathname={"/maps/api/js"}
                query={{v: `3`, libraries: "geometry,drawing,places"}}
                loadingElement={ <div style={{ height: "300px", width: "100%" }}></div> }
                containerElement={ <div {...this.props} style={{ height: "300px", width: "100%" }}></div> }
                googleMapElement={
                        <GoogleMap
                            defaultZoom={ 16 }
                            defaultCenter={{ lat: marker.position.lat, lng: marker.position.lng }}
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
