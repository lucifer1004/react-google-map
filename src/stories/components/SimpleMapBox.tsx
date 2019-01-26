import React from 'react'
import ReactLive from './ReactLive'
import {MapBox} from '../../lib'

const scope = {MapBox}

const code = `<MapBox apiKey=""/>`

export default () => <ReactLive code={code} scope={scope} />
