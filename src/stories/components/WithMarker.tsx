import React from 'react'
import {LiveProvider, LiveEditor, LiveError, LivePreview} from 'react-live'
import {MapBox, Marker} from '../../lib'

const scope = {MapBox, Marker}

const code = `<MapBox apiKey="">
  <Marker position={{lat: 39, lng: 116}} />
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
