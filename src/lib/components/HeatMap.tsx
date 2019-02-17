import React, {useContext, useEffect, useState} from 'react'
import {DEFAULT_HEAT_MAP_OPTIONS} from '../common/constants'
import {HeatMapProps, WeightedLatLng} from '../common/types'
import {GoogleMapContext} from '../contexts/GoogleMapContext'
import withSecurityBounder from '../hocs/SecurityBounder'

const transformLatLng = (
  orig: WeightedLatLng,
): google.maps.visualization.WeightedLocation => ({
  location: new google.maps.LatLng(orig.lat, orig.lng),
  weight: orig.weight || 1,
})

export const HeatMap = ({opts = DEFAULT_HEAT_MAP_OPTIONS}: HeatMapProps) => {
  const {state} = useContext(GoogleMapContext)
  const [heatMap, setHeatMap] = useState(
    (undefined as unknown) as google.maps.visualization.HeatmapLayer,
  )
  useEffect(() => {
    if (state.map === undefined) return
    setHeatMap(
      new google.maps.visualization.HeatmapLayer({
        ...opts,
        data: opts.data.map(latLng => transformLatLng(latLng)),
        map: state.map,
      }),
    )
  }, [state.map])

  useEffect(() => {
    if (heatMap === undefined || state.map === undefined) return
    heatMap.setData(opts.data.map(latLng => transformLatLng(latLng)))
    heatMap.setMap(state.map)
    return () => {
      heatMap.setMap(null)
    }
  }, [opts.data])

  return null
}

export const SafeHeatMap = withSecurityBounder(HeatMap)
