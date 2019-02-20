import React from 'react'
import {
  BicyclingLayer,
  Circle,
  MapBox,
  OverlayView,
  Rectangle,
  TrafficLayer,
  TransitLayer,
  GroundOverlay,
  SearchBox,
} from './lib'
import MarkerPanel from './components/MarkerPanel'
import StreetViewControl from './components/StreetViewControl'
import './App.css'

const App = () => {
  return (
    <div className="App">
      <MarkerPanel />
      <OverlayView disableMapHitsAndGestures>
        <h2>{`⚑ This is a custom overlay 🙌`}</h2>
      </OverlayView>
      <div className="Map">
        <SearchBox
          id="search-box"
          placeholder="Search..."
          bindingPosition="BOTTOM_CENTER"
        />
        <MapBox
          apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY || ''}
          usePlaces
          useVisualization
        />
        <StreetViewControl />
        <StreetViewControl bindToMap />
        <BicyclingLayer />
        <TrafficLayer />
        <TransitLayer />
        <GroundOverlay id="image" />
      </div>
    </div>
  )
}

App.displayName = 'App'

export default App
