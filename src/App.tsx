import React from 'react'
import {InfoWindow, MapBox, Marker} from './lib'

export default () => (
  <div className="App">
    <header className="App-header">
      <MapBox
        apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY || ''}
        center={{lat: 39, lng: 116}}
        zoom={14}
        useDrawing={true}
        useGeometry={true}
        usePlaces={true}
        useVisualization={true}
        onCenterChanged={() => {
          console.log('The center of the map has changed.')
        }}
      >
        <Marker
          draggable
          position={{lat: 39, lng: 116.002}}
          onClick={() => {
            console.log('The marker is clicked.')
          }}
          onDoubleClick={() => {
            console.log('The marker is double clicked.')
          }}
        />
        <InfoWindow
          position={{lat: 39, lng: 116.002}}
          content="This is an info window"
        />
        <Marker
          position={{lat: 39.001, lng: 116}}
          onMouseOver={() => {
            console.log('The mouse is hovering on the marker.')
          }}
        />
      </MapBox>
    </header>
  </div>
)
