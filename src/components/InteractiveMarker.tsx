import React, {useState, useContext} from 'react'
import {GoogleMapContext, InfoWindow, Marker} from '../lib'

interface InteractiveMarkerProps {
  num: number
  positions: google.maps.LatLngLiteral[]
  setPositions: React.Dispatch<
    React.SetStateAction<google.maps.LatLngLiteral[]>
  >
}

export default ({num, positions, setPositions}: InteractiveMarkerProps) => {
  const {state} = useContext(GoogleMapContext)
  const [infoDisplay, setInfoDisplay] = useState(false)
  const changeInfoDisplay = () => setInfoDisplay(display => !display)
  return (
    <>
      <Marker
        id={`marker-${num}`}
        opts={{
          draggable: true,
          label: num.toString(),
          position: positions[num],
        }}
        onClick={changeInfoDisplay}
        onDragEnd={event => {
          setPositions(positions => {
            positions[num] = event.latLng.toJSON()
            return positions.slice()
          })
        }}
      />
      <InfoWindow
        anchor={state.markers.get(`marker-${num}`)}
        opts={{
          content: `marker-${num}
            lat: ${positions[num].lat.toFixed(4)} 
            lng: ${positions[num].lng.toFixed(4)}
          `,
        }}
        visible={infoDisplay}
        onCloseClick={() => setInfoDisplay(false)}
      />
    </>
  )
}