import React, {Component} from 'react'
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
import './MapComponent.css';

export class MapComponent extends Component {

    constructor(props) {
        super(props);
        console.log(props);
    }

    state = {
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    activeMarker: {},          // Shows the active marker upon click
    selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
    };

    onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

    onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
     }
    };

    render() {
        return (<div className="map-area">
            <div className="map-title">
                <h1> Location on Map </h1>
            </div>
            <Map
                style={{width: 500, height: 500}}
                google={this.props.google}
                zoom={2}
                center={{
                    lat: 47.444,
                    lng: -122.176
                }}>
                {this.props.pinData ? this.props.pinData.map(item => <Marker key={item}
                    position={{
                        lat: item.geolocation.coordinates[0],
                        lng: item.geolocation.coordinates[1]
                    }}
                    onClick = {this.onMarkerClick} name= {item.name}
                >
                </Marker>) : null}

                <InfoWindow
                  marker={this.state.activeMarker}
                  visible={this.state.showingInfoWindow}
                  onClose={this.onClose}
                >
                  <div>
                    <h4>{this.state.selectedPlace.name}</h4>
                  </div>
                </InfoWindow>

            </Map>
        </div>);
    }
}
export default GoogleApiWrapper({
    apiKey: ('AIzaSyDSwD0pNhJ-htNMmzC_3GVRahsGN-Y6QR8') // personal API key for google maps
})(MapComponent);