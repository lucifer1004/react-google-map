import React, {useContext, useEffect, useState} from 'react'
import {GoogleMapContext} from '../contexts/GoogleMapContext'
import {HeatMapProps, WeightedLatLng} from '../common/types'

const transformLatLng = (
  orig: WeightedLatLng,
): google.maps.visualization.WeightedLocation => {
  return {
    location: new google.maps.LatLng(orig.lat, orig.lng),
    weight: orig.weight || 1,
  }
}

const HeatMap: React.FunctionComponent<HeatMapProps> = ({
  data,
  dissipating = false,
  gradient,
  maxIntensity,
  opacity,
  radius,
}) => {
  const {state} = useContext(GoogleMapContext)
  const [heatMap, setHeatMap] = useState(
    (undefined as unknown) as google.maps.visualization.HeatmapLayer,
  )
  useEffect(() => {
    if (state.map === undefined) return
    setHeatMap(
      new google.maps.visualization.HeatmapLayer({
        data: data.map(latLng => transformLatLng(latLng)),
        dissipating: dissipating,
        gradient: gradient,
        map: state.map,
        maxIntensity: maxIntensity,
        opacity: opacity,
        radius: radius,
      }),
    )
  }, [state.map])

  useEffect(() => {
    if (heatMap === undefined || state.map === undefined) return
    heatMap.setData(data.map(latLng => transformLatLng(latLng)))
    heatMap.setMap(state.map)
    return () => {
      heatMap.setMap(null)
    }
  }, [data])

  return null
}

export default HeatMap
