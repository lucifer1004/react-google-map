import React, {useContext, useEffect, useState} from 'react'
import {GoogleMapContext} from '../contexts/GoogleMapContext'

const BICYCLING_LAYER = 'bicycling-layer'

export default ({}) => {
  const {state, dispatch} = useContext(GoogleMapContext)
  const [bicyclingLayer, setBicyclingLayer] = useState(
    (undefined as unknown) as google.maps.BicyclingLayer,
  )
  const addBicyclingLayer = (bicyclingLayer: google.maps.BicyclingLayer) => {
    if (!state.objects.has(BICYCLING_LAYER))
      dispatch({
        type: 'add_object',
        object: bicyclingLayer,
        id: BICYCLING_LAYER,
      })
  }
  const removeBicyclingLayer = () =>
    dispatch({type: 'remove_object', id: BICYCLING_LAYER})

  useEffect(() => {
    if (state.map === undefined) return
    const bicyclingLayer = new google.maps.BicyclingLayer()
    bicyclingLayer.setMap(state.map)
    setBicyclingLayer(bicyclingLayer)
  }, [state.map])

  useEffect(() => {
    if (bicyclingLayer === undefined) return

    // Add the bicyclingLayer to state.objects
    addBicyclingLayer(bicyclingLayer)

    // Remove the bicyclingLayer when the component is unmounted
    return () => removeBicyclingLayer()
  }, [bicyclingLayer])

  return null
}
