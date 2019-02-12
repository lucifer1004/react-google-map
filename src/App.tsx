import React from 'react'
import {HeatMap, InfoWindow, MapBox, Polygon} from './lib'
import MarkerPanel from './components/MarkerPanel'

const App = () => {
  return (
    <div className="App">
      <MarkerPanel />
      <div className="App-header">
        <MapBox
          apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY || ''}
          opts={{
            center: {lat: 39, lng: 116},
            noClear: true,
            zoom: 14,
          }}
          useDrawing
          useGeometry
          usePlaces
          useVisualization
          onCenterChanged={() => {
            console.log('The center of the map has changed.')
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
          id="polygon"
          opts={{
            draggable: true,
          }}
          paths={[
            {lat: 38.98, lng: 116.01},
            {lat: 38.98, lng: 116.03},
            {lat: 38.99, lng: 116.03},
          ]}
          visible
        />
        <HeatMap
          data={[
            {lat: 38.982, lng: 116.047},
            {lat: 38.982, lng: 116.045},
            {lat: 38.982, lng: 116.043},
            {lat: 38.982, lng: 116.041},
            {lat: 38.982, lng: 116.039},
            {lat: 38.982, lng: 116.037},
            {lat: 38.982, lng: 116.035},
            {lat: 38.985, lng: 116.047},
            {lat: 38.985, lng: 116.045},
            {lat: 38.985, lng: 116.043},
            {lat: 38.985, lng: 116.041},
            {lat: 38.985, lng: 116.039},
            {lat: 38.985, lng: 116.037},
            {lat: 38.985, lng: 116.035},
          ]}
        />
      </div>
    </div>
  )
}

App.displayName = 'App'

export default App
