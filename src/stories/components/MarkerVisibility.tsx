import React from 'react'
import ReactLive from './ReactLive'
import {MapBox, Marker, withMapContext} from '../../lib'

const handleClick = (
  markers: google.maps.Marker[] | undefined,
  filter: string,
) => {
  console.log('Marker is clicked')
  if (markers === undefined) return
  markers
    .filter(marker => marker.getLabel() === filter)
    .forEach(marker => marker.setVisible(!marker.getVisible()))
}

const originalButton = ({
  markers,
  text,
  filter,
  onClick,
}: {
  markers: google.maps.Marker[]
  text: string
  filter: string
  onClick: (markers: google.maps.Marker[] | undefined, filter: string) => void
}) => (
  <button
    onClick={() => onClick(markers, filter)}
    style={{
      height: '20px',
    }}
  >
    {text}
  </button>
)

const Button = withMapContext(originalButton)

const code = `<MapBox
  apiKey=""
  LoadedComponent={
    () => 
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <h1>You can change a marker's visibility</h1>
        <Button text="TestButton" filter="test" onClick={handleClick} />
      </div>
    }
  >
  <Marker label="test" position={{lat: 39, lng: 116}} />
</MapBox>`

const scope = {
  MapBox,
  Marker,
  withMapContext,
  handleClick,
  originalButton,
  Button,
}

export default () => <ReactLive code={code} scope={scope} />
