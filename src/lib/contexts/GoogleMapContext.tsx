import React, {useReducer} from 'react'
import isEqual from 'lodash.isequal'
import {
  GoogleMapAction,
  GoogleMapReducer,
  GoogleMapState,
} from '../common/types'

const initialState: GoogleMapState = {
  map: undefined,
  markers: [],
}

const GoogleMapContext = React.createContext<GoogleMapReducer>({
  state: initialState,
  dispatch: (null as unknown) as React.Dispatch<GoogleMapAction>,
})

const reducer = (state: GoogleMapState, action: GoogleMapAction) => {
  switch (action.type) {
    case 'reset':
      state.markers.forEach(marker => {
        marker.setMap(null)
      })
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
      if (
        state.markers.findIndex(marker => isEqual(marker, action.marker)) !== -1
      ) {
        throw new Error('The marker has already been added')
      }
      return {...state, markers: [...state.markers, action.marker]}
    case 'remove_marker':
      if (action.marker === undefined) {
        throw new Error('You should specify a marker instance')
      }
      const index = state.markers.findIndex(marker =>
        isEqual(marker, action.marker),
      )
      if (index === -1) {
        throw new Error('The marker cannot be found')
      }
      state.markers[index].setMap(null)
      state.markers.splice(index, 1)
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
