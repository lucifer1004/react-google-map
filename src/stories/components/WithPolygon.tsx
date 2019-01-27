import React from 'react'
import ReactLive from './ReactLive'
import {GoogleMapProvider, MapBox, Polygon} from '../../lib'

const scope = {GoogleMapProvider, MapBox, Polygon}

const code = `<GoogleMapProvider>
  <MapBox apiKey="" LoadedComponent={() => <h1>Display a polygon</h1>} zoom={14}/>
  <Polygon
    paths={[
      {lat: 39.01, lng: 116.01},
      {lat: 39.01, lng: 116.03},
      {lat: 39.02, lng: 116.03},
    ]}
  />
</GoogleMapProvider>
`

export default () => <ReactLive code={code} scope={scope} />
