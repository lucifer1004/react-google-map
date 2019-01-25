import React from 'react'
import {LiveProvider, LiveEditor, LiveError, LivePreview} from 'react-live'
import {InfoWindow, MapBox} from '../../lib'

const scope = {InfoWindow, MapBox}

const code = `<MapBox apiKey="">
  <InfoWindow 
    content="This is an info window"
    position={{lat: 39, lng: 116.002}}
  />
</MapBox>
`

export default () => (
  <div>
    <LiveProvider code={code} scope={scope}>
      <LiveEditor />
      <LiveError />
      <LivePreview />
    </LiveProvider>
  </div>
)
