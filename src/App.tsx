import React from 'react'
import {InfoWindow, MapBox, Marker, Polygon} from './lib'

const App = () => (
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
          label="first"
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
          label="second"
          position={{lat: 39, lng: 115.97}}
          onMouseOver={() => {
            console.log('The mouse is hovering on the marker.')
          }}
        />
        <Polygon
          draggable
          paths={[
            {lat: 39.004, lng: 116.004},
            {lat: 39.015, lng: 116.004},
            {lat: 39.015, lng: 116.015},
          ]}
        />
      </MapBox>
    </header>
  </div>
)

App.displayName = 'App'

export default App
