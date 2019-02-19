import React, {useContext, useEffect, useState} from 'react'
import {DEFAULT_KML_LAYER_OPTIONS} from '../common/constants'
import {KmlLayerProps} from '../common/types'
import {GoogleMapContext} from '../contexts/GoogleMapContext'
import {useGoogleListener} from '../hooks'

export default ({
  id,
  opts = DEFAULT_KML_LAYER_OPTIONS,
  onClick,
  onDefaultViewportChanged,
  onStatusChanged,
}: KmlLayerProps) => {
  const {state, dispatch} = useContext(GoogleMapContext)
  const [kmlLayer, setKmlLayer] = useState<google.maps.KmlLayer | undefined>(
    undefined,
  )

  const addKmlLayer = (kmlLayer: google.maps.KmlLayer) => {
    if (!state.objects.has(id))
      dispatch({
        type: 'add_object',
        object: kmlLayer,
        id: id,
      })
  }
  const removeKmlLayer = () => dispatch({type: 'remove_object', id: id})

  // Create KmlLayer when map is ready
  useEffect(() => {
    if (state.map === undefined) return
    setKmlLayer(new google.maps.KmlLayer({...opts, map: state.map}))
  }, [state.map])

  useEffect(() => {
    if (kmlLayer === undefined) return

    // Add the kmlLayer to state.objects
    addKmlLayer(kmlLayer)

    // Remove the kmlLayer when the component is unmounted
    return () => removeKmlLayer()
  }, [kmlLayer])

  useGoogleListener(kmlLayer, [
    {name: 'click', handler: onClick},
    {name: 'defaultviewport_changed', handler: onDefaultViewportChanged},
    {name: 'status_changed', handler: onStatusChanged},
  ])

  useEffect(() => {
    if (kmlLayer === undefined) return
    opts && kmlLayer.setOptions(opts)
  }, [opts])

  return null
}
