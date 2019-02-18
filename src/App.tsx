import React from 'react'
import {
  BicyclingLayer,
  Circle,
  MapBox,
  OverlayView,
  Polygon,
  Rectangle,
  Polyline,
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
      <div className="App-header">
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
        <Circle id="circle" />
        <Polygon id="polygon" />
        <Polyline id="polyline" />
        <Rectangle id="rectangle" />
        <StreetViewControl />
        <StreetViewControl bindToMap />
        <BicyclingLayer />
        <TrafficLayer />
        <TransitLayer />
        <GroundOverlay
          id="image"
          opts={{
            url: 'https://placehold.it/256x256',
            bounds: {
              east: -73.98,
              west: -73.985,
              north: 40.706,
              south: 40.702,
            },
          }}
        />
      </div>
    </div>
  )
}

App.displayName = 'App'

export default App
