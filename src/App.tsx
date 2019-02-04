import React, {useState} from 'react'
import {InfoWindow, MapBox, Marker, Polygon} from './lib'

const App = () => {
  const [num, setNum] = useState(1)
  const initialPositions = Array.from({length: 10}, () => {
    return {lat: 39 + Math.random() / 50, lng: 116 + Math.random() / 50}
  })
  const addMarker = () => setNum(num => (num < 10 ? num + 1 : 10))
  const removeMarker = () => setNum(num => (num > 1 ? num - 1 : 1))
  const [positions, setPositions] = useState(initialPositions)
  return (
    <div className="App">
      <button onClick={addMarker}>Add a marker</button>
      <button onClick={removeMarker}>Remove a marker</button>
      <p>Current markers: {num}</p>
      <div className="App-header">
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
        <ul>
          {Array.from({length: num}, (value, index) => index).map(num => (
            <li key={num}>
              <Marker
                id={`marker-${num}`}
                opts={{
                  draggable: true,
                  label: num.toString(),
                  position: positions[num],
                }}
                onDragEnd={event => {
                  setPositions(positions => {
                    positions[num] = event.latLng.toJSON()
                    return positions
                  })
                }}
              />
            </li>
          ))}
        </ul>
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
      </div>
    </div>
  )
}

App.displayName = 'App'

export default App
