import React from 'react'
import {MapBox, OverlayView, Polygon} from './lib'
import MarkerPanel from './components/MarkerPanel'

const App = () => {
  return (
    <div className="App">
      <MarkerPanel />
      <OverlayView
        position={{lat: 39, lng: 116}}
        onClick={event => {
          console.log(event)
        }}
        disableMapHitsAndGestures
      >
        <h2>{`⚑ This is a custom overlay 🙌`}</h2>
      </OverlayView>
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
        <Polygon
          id="polygon"
          opts={{
            draggable: true,
          }}
          paths={[
            {lat: 38.98, lng: 116.01},
            {lat: 38.98, lng: 116.03},
            {lat: 38.99, lng: 116.03},
            {lat: 38.99, lng: 116.01},
          ]}
          visible
        />
      </div>
    </div>
  )
}

App.displayName = 'App'

export default App
