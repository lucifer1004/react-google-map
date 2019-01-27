import React, {useReducer} from 'react'
import {isEqual} from 'lodash-es'

const initialState: GoogleMapState = {
  map: undefined,
  markers: [],
}

const GoogleMapContext = React.createContext<GoogleMapProps>({
  state: initialState,
})

const reducer = (state: GoogleMapState, action: GoogleMapAction) => {
  switch (action.type) {
    case 'reset':
      state.markers.forEach(marker => {
        marker.setMap(null)
      })
      return initialState
    case 'marker_add':
      if (action.marker === undefined) {
        throw new Error('You should specify a marker instance')
      }
      if (
        state.markers.findIndex(marker => isEqual(marker, action.marker)) !== -1
      ) {
        throw new Error('The marker has already been added')
      }
      return {...state, markers: [...state.markers, action.marker]}
    case 'marker_remove':
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

interface GoogleMapProps {
  state: GoogleMapState
  dispatch?: React.Dispatch<GoogleMapAction>
}

interface GoogleMapState {
  map: google.maps.Map | undefined
  markers: google.maps.Marker[]
}

interface GoogleMapAction {
  type: string
  marker?: google.maps.Marker
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

export default {GoogleMapContext, GoogleMapProvider, GoogleMapConsumer}
