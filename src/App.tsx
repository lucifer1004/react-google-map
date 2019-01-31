import React from 'react'
import {GoogleMapProvider, InfoWindow, MapBox, Marker, Polygon} from './lib'

const App = () => (
  <div className="App">
    <header className="App-header">
      <GoogleMapProvider>
        <MapBox
          apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY || ''}
          opts={{
            center: {lat: 39, lng: 116},
            noClear: true,
            zoom: 14,
          }}
          useDrawing={true}
          useGeometry={true}
          usePlaces={true}
          useVisualization={true}
          onCenterChanged={() => {
            console.log('The center of the map has changed.')
          }}
        />
        <Marker
          id="hello"
          opts={{
            draggable: true,
            label: 'hello',
            position: {lat: 39, lng: 116},
          }}
        />
        <InfoWindow
          opts={{
            content: 'This is an info window',
            position: {lat: 39.01, lng: 115.99},
          }}
          visible
        />
        <Polygon
          paths={[
            {lat: 38.98, lng: 116.01},
            {lat: 38.98, lng: 116.03},
            {lat: 38.99, lng: 116.03},
          ]}
          visible
        />
      </GoogleMapProvider>
    </header>
  </div>
)

App.displayName = 'App'

export default App
