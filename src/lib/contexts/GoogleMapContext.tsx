import React, {useReducer} from 'react'
import {
  GoogleMapAction,
  GoogleMapReducer,
  GoogleMapState,
} from '../common/types'

const initialState: GoogleMapState = {
  map: undefined,
  markers: new Map<string, google.maps.Marker>(),
  polygons: new Map<string, google.maps.Polygon>(),
}

const GoogleMapContext = React.createContext<GoogleMapReducer>({
  state: initialState,
  dispatch: (null as unknown) as React.Dispatch<GoogleMapAction>,
})

const reducer = (state: GoogleMapState, action: GoogleMapAction) => {
  switch (action.type) {
    case 'reset':
      return initialState
    case 'init_map':
      if (action.map === undefined) {
        throw new Error('You should specify a map instance')
      }
      if (state.map !== undefined) {
        throw new Error('There can only be one map instance in a context')
      }
      return {...state, map: action.map}
    case 'add_marker':
      if (action.marker === undefined) {
        throw new Error('You should specify a marker instance')
      }
      if (action.id === undefined) {
        throw new Error('You should specify an id')
      }
      if (state.markers.has(action.id)) {
        throw new Error('The id has already been taken')
      }
      return {...state, markers: state.markers.set(action.id, action.marker)}
    case 'remove_marker':
      if (action.id === undefined) {
        throw new Error('You should specify an id')
      }
      const markerToRemove = state.markers.get(action.id)
      if (markerToRemove === undefined) {
        throw new Error('There is no marker with the given id')
      }
      markerToRemove.setMap(null)
      state.markers.delete(action.id)
      return state
    case 'add_polygon':
      if (action.polygon === undefined) {
        throw new Error('You should specify a polygon instance')
      }
      if (action.id === undefined) {
        throw new Error('You should specify an id')
      }
      if (state.polygons.has(action.id)) {
        throw new Error('The id has already been taken')
      }
      return {...state, polygons: state.polygons.set(action.id, action.polygon)}
    case 'remove_polygon':
      if (action.id === undefined) {
        throw new Error('You should specify an id')
      }
      const polygonToRemove = state.polygons.get(action.id)
      if (polygonToRemove === undefined) {
        throw new Error('There is no polygon with the given id')
      }
      polygonToRemove.setMap(null)
      state.polygons.delete(action.id)
      return state
    default:
      return state
  }
}

const GoogleMapProvider = ({children}: {children: React.ReactNode}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = {state, dispatch}

  return (
    <>
      <GoogleMapContext.Provider value={value}>
        {children}
      </GoogleMapContext.Provider>
    </>
  )
}

const GoogleMapConsumer = GoogleMapContext.Consumer

export {GoogleMapContext, GoogleMapProvider, GoogleMapConsumer}
