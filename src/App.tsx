import React from 'react'
import {
  BicyclingLayer,
  MapBox,
  OverlayView,
  TrafficLayer,
  TransitLayer,
  GroundOverlay,
  SearchBox,
} from './lib'
import CenterButton from './components/CenterButton'
import MarkerPanel from './components/MarkerPanel'
import StreetViewControl from './components/StreetViewControl'
import './App.css'

const App = () => {
  return (
    <div className="App">
      <MarkerPanel />
      <OverlayView disableMapHitsAndGestures>
        <h2>This is an OverlayView 🙌</h2>
      </OverlayView>
      <div className="Map">
        <SearchBox
          id="search-box"
          placeholder="Search..."
          bindingPosition="BOTTOM_CENTER"
        />
        <MapBox
          apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY || ''}
          opts={{
            center: {
              lat: 40.7128,
              lng: -74.006,
            },
            disableDefaultUI: true,
            streetViewControl: true,
            zoom: 14,
          }}
          usePlaces
          useVisualization
        />
        <CenterButton />
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
