import React from 'react'
import {LiveProvider, LiveEditor, LiveError, LivePreview} from 'react-live'
import MapBox from '../../components/MapBox'

const scope = {MapBox}

const code = `<MapBox apiKey=""/>`

export default () => (
  <div>
    <LiveProvider code={code} scope={scope}>
      <LiveEditor />
      <LiveError />
      <LivePreview />
    </LiveProvider>
  </div>
)
