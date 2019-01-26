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
}) => <button onClick={() => onClick(markers, filter)}>{text}</button>

const Button = withMapContext(originalButton)

const code = `<MapBox apiKey="A_FAKE_API_KEY" LoadedComponent={() => <h1>You can change a marker's visibility</h1>}>
  <Marker label="test" position={{lat: 39, lng: 116}} />
  <Button text="TestButton" filter="test" onClick={handleClick} />
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
