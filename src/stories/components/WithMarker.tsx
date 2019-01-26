import React from 'react'
import ReactLive from './ReactLive'
import {MapBox, Marker} from '../../lib'

const scope = {MapBox, Marker}

const code = `<MapBox apiKey="" LoadedComponent={() => <h1>Display a marker</h1>}>
  <Marker position={{lat: 39, lng: 116}} />
</MapBox>
`

export default () => <ReactLive code={code} scope={scope} />
