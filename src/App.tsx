import React from 'react'
import {MapBox, OverlayView, Polygon} from './lib'
import MarkerPanel from './components/MarkerPanel'
import StreetViewControl from './components/StreetViewControl'
import './App.css'

const App = () => {
  return (
    <div className="App">
      <MarkerPanel />
      <OverlayView
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
          useVisualization
        />
        <Polygon id="polygon" />
        <StreetViewControl />
        <StreetViewControl bindToMap />
      </div>
    </div>
  )
}

App.displayName = 'App'

export default App
