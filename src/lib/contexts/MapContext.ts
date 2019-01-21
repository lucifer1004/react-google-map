import React from 'react'
import {MapContextProps} from '../common/types'

const MapContext = React.createContext<MapContextProps>({
  map: undefined,
  loaded: false,
})

export default MapContext
