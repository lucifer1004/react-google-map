import React, {useReducer} from 'react'
import {
  GoogleMapAction,
  GoogleMapObject,
  GoogleMapProviderProps,
  GoogleMapReducer,
  GoogleMapState,
} from '../common/types'

const initialState: GoogleMapState = {
  map: undefined,
  objects: new Map<string, GoogleMapObject>(),
  service: undefined,
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
      return {...state, map: action.map, service: action.service}
    case 'add_object':
      if (action.object === undefined) {
        throw new Error('You should specify an object instance')
      }
      if (action.id === undefined) {
        throw new Error('You should specify an id')
      }
      if (state.objects.has(action.id)) {
        throw new Error('The id has already been taken')
      }
      return {...state, objects: state.objects.set(action.id, action.object)}
    case 'remove_object':
      if (action.id === undefined) {
        throw new Error('You should specify an id')
      }
      const objectToRemove = state.objects.get(action.id)
      if (objectToRemove === undefined) {
        throw new Error('There is no object with the given id')
      }
      objectToRemove.setMap(null)
      state.objects.delete(action.id)
      return state
    default:
      return state
  }
}

const GoogleMapProvider = ({children}: GoogleMapProviderProps) => {
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
