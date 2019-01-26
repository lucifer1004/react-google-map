import React from 'react'
import ReactLive from './ReactLive'
import {InfoWindow, MapBox} from '../../lib'

const scope = {InfoWindow, MapBox}

const code = `<MapBox apiKey="" LoadedComponent={() => <h1>Display an info window</h1>}>
  <InfoWindow 
    content="This is an info window"
    position={{lat: 39, lng: 116.002}}
  />
</MapBox>
`

export default () => <ReactLive code={code} scope={scope} />
