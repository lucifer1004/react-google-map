import React from 'react'
import {MapBox, OverlayView, Polygon, StreetView} from './lib'
import MarkerPanel from './components/MarkerPanel'
import {NYC_LATLNG, NYC_POLYGON} from './common/constants'

const App = () => {
  return (
    <div className="App">
      <MarkerPanel />
      <OverlayView
        position={NYC_LATLNG}
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
          mapStyle={{
            height: '50vh',
            width: '100vw',
          }}
          opts={{
            center: NYC_LATLNG,
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
          paths={NYC_POLYGON}
          visible
        />
        <StreetView
          mapStyle={{
            height: '50vh',
            width: '100vw',
          }}
          opts={{
            position: NYC_LATLNG,
          }}
          visible
        />
      </div>
    </div>
  )
}

App.displayName = 'App'

export default App
