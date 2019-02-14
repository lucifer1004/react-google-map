import React, {useState} from 'react'
import {HeatMap} from '../lib'
import InteractiveMarker from './InteractiveMarker'
import {NYC_LATLNG} from '../common/constants'

export default () => {
  const [num, setNum] = useState(1)
  const initialPositions = Array.from({length: 10}, () => ({
    lat: NYC_LATLNG.lat + Math.random() / 100,
    lng: NYC_LATLNG.lng + Math.random() / 100,
  }))
  const addMarker = () => setNum(num => (num < 10 ? num + 1 : 10))
  const removeMarker = () => setNum(num => (num > 1 ? num - 1 : 1))
  const [positions, setPositions] = useState(initialPositions)
  return (
    <>
      <button onClick={addMarker}>Add a marker</button>
      <button onClick={removeMarker}>Remove a marker</button>
      <p>Current markers: {num}</p>
      <ul>
        {Array.from({length: num}, (value, index) => index).map(num => (
          <li hidden key={num}>
            <InteractiveMarker
              num={num}
              positions={positions}
              setPositions={setPositions}
            />
          </li>
        ))}
      </ul>
      <HeatMap data={positions.slice(0, num)} />
    </>
  )
}
