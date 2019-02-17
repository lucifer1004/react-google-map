import React from 'react'
import Layer from './Layer'
import {TrafficLayerProps} from '../common/types'

export default ({opts}: TrafficLayerProps) => (
  <Layer type="traffic" opts={opts} />
)
