import React from 'react'
import ReactLive from './ReactLive'
import {MapBox} from '../../lib'

const scope = {MapBox}

const code = `<MapBox apiKey="A_FAKE_API_KEY"/>`

export default () => <ReactLive code={code} scope={scope} />
