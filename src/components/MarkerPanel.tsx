import React, {useState} from 'react'
import {Marker} from '../lib'

export default () => {
  const [num, setNum] = useState(1)
  const initialPositions = Array.from({length: 10}, () => {
    return {lat: 39 + Math.random() / 50, lng: 116 + Math.random() / 50}
  })
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
    </>
  )
}
