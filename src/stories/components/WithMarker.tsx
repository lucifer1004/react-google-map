import React from 'react'
import ReactLive from './ReactLive'
import {GoogleMapProvider, MapBox, Marker} from '../../lib'

const scope = {GoogleMapProvider, MapBox, Marker}

const code = `<GoogleMapProvider>
  <MapBox 
    apiKey=""
    LoadedComponent={() => <h1>Display a marker</h1>}
  />
  <Marker id="marker" />
</GoogleMapProvider>
`

export default () => <ReactLive code={code} scope={scope} />
