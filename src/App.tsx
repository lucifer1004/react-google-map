import React from 'react'
import {MapBox} from './lib'

export default () => (
  <div className="App">
    <header className="App-header">
      <MapBox
        apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY || ''}
        zoomLevel={14}
        useDrawing={true}
        useGeometry={true}
        usePlaces={true}
        useVisualization={true}
      />
    </header>
  </div>
)
