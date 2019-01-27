import React from 'react'
import ReactLive from './ReactLive'
import {GoogleMapProvider, MapBox} from '../../lib'

const scope = {GoogleMapProvider, MapBox}

const code = `<GoogleMapProvider>
  <MapBox apiKey=""/>
</GoogleMapProvider>`

export default () => <ReactLive code={code} scope={scope} />
