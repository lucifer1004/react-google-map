import React, {useContext, useEffect, useState} from 'react'
import {GoogleMapLayer, Layers, LayerProps} from '../common/types'
import {GoogleMapContext} from '../contexts/GoogleMapContext'

export default ({type}: LayerProps) => {
  const layerId = `${type}-layer`
  const {state, dispatch} = useContext(GoogleMapContext)
  const [layer, setLayer] = useState((undefined as unknown) as GoogleMapLayer)

  const addLayer = (layer: GoogleMapLayer) => {
    if (!state.objects.has(type))
      dispatch({
        type: 'add_object',
        object: layer,
        id: layerId,
      })
  }
  const removeLayer = () => dispatch({type: 'remove_object', id: layerId})

  useEffect(() => {
    if (state.map === undefined) return
    const layerNameToClass = {
      bicycling: google.maps.BicyclingLayer,
      traffic: google.maps.TrafficLayer,
      transit: google.maps.TransitLayer,
    }
    const layer = new layerNameToClass[type]()
    layer.setMap(state.map)
    setLayer(layer)
  }, [state.map])

  useEffect(() => {
    if (layer === undefined) return

    // Add the layer to state.objects
    addLayer(layer)

    // Remove the layer when the component is unmounted
    return () => removeLayer()
  }, [layer])

  return null
}
