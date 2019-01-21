import React from 'react'
import {MapBox, Marker} from './lib'

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
      >
        <Marker />
        <Marker position={{lat: 39.001, lng: 116}} />
      </MapBox>
    </header>
  </div>
)
