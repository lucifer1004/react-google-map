import React, {useContext, useEffect, useState} from 'react'
import {
  DEFAULT_MAP_STYLE,
  DEFAULT_STREET_VIEW_OPTIONS,
} from '../common/constants'
import {GoogleMapContext} from '../contexts/GoogleMapContext'
import {useGoogleListener} from '../hooks'
import {StreetViewProps} from '../common/types'
import RandomId from '../helpers/generateRandomId'

const StreetView = ({
  className,
  style = DEFAULT_MAP_STYLE,
  opts = DEFAULT_STREET_VIEW_OPTIONS,
  bindToMap = false,
  onCloseClick,
  onPanoChanged,
  onPositionChanged,
  onPovChanged,
  onResize,
  onStatusChanged,
  onVisibleChanged,
  onZoomChanged,
}: StreetViewProps) => {
  const {state} = useContext(GoogleMapContext)
  const [streetView, setStreetView] = useState<
    google.maps.StreetViewPanorama | undefined
  >(undefined)

  // Generate a random id for the DOM node where Google Map will be inserted
  const [containerId] = useState(`street-view-${RandomId()}`)

  const resetMap = () => {
    if (state.map && (bindToMap || state.map.getStreetView() === streetView)) {
      state.map.setOptions({streetView: undefined})
    }
  }

  const bind = () => {
    state.map && state.map.setOptions({streetView: streetView})
    streetView && streetView.setVisible(true)
  }

  const unbind = () => {
    resetMap()
    streetView && streetView.setVisible(true)
  }

  // Handle StreetView creation and unregister
  useEffect(() => {
    if (state.map === undefined) return
    const streetView = new google.maps.StreetViewPanorama(
      document.getElementById(containerId) as HTMLElement,
      opts,
    )
    setStreetView(streetView)
    return () => resetMap()
  }, [state.map])

  // Handle `bindToMap` prop change
  useEffect(() => {
    if (streetView === undefined) return
    if (!bindToMap) unbind()
    else bind()
  }, [streetView, bindToMap])

  useGoogleListener(streetView, [
    {name: 'closeclick', handler: onCloseClick},
    {name: 'pano_changed', handler: onPanoChanged},
    {name: 'position_changed', handler: onPositionChanged},
    {name: 'pov_changed', handler: onPovChanged},
    {name: 'resize', handler: onResize},
    {name: 'status_changed', handler: onStatusChanged},
    {name: 'visible_changed', handler: onVisibleChanged},
    {name: 'zoom_changed', handler: onZoomChanged},
  ])

  // Modify the google.maps.StreetViewPanorama object when component props change
  useEffect(() => {
    if (streetView === undefined) return
    streetView.setOptions(opts)
  }, [opts])

  return <div className={className} id={containerId} style={style} />
}

StreetView.displayName = 'StreetView'

export default StreetView
