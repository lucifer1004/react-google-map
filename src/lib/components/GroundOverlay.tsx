import React, {useContext, useEffect, useState} from 'react'
import {useGoogleListener} from '../hooks'
import {DEFAULT_GROUND_OVERLAY_OPTIONS} from '../common/constants'
import {GroundOverlayProps} from '../common/types'
import {GoogleMapContext} from '../contexts/GoogleMapContext'

export default ({
  id,
  opts = DEFAULT_GROUND_OVERLAY_OPTIONS,
  onClick,
  onDoubleClick,
}: GroundOverlayProps) => {
  const {state, dispatch} = useContext(GoogleMapContext)
  const [groundOverlay, setGroundOverlay] = useState<
    google.maps.GroundOverlay | undefined
  >(undefined)
  const [prevBounds, setPrevBounds] = useState<
    google.maps.LatLngBoundsLiteral | undefined
  >(undefined)
  const [prevClickable, setPrevClickable] = useState<boolean | undefined>(
    undefined,
  )
  const addGroundOverlay = (groundOverlay: google.maps.GroundOverlay) => {
    if (!state.objects.has(id))
      dispatch({type: 'add_object', object: groundOverlay, id: id})
  }
  const removeGroundOverlay = () => dispatch({type: 'remove_object', id: id})

  useEffect(() => {
    if (state.map === undefined) return
    setGroundOverlay(
      new google.maps.GroundOverlay(opts.url, opts.bounds, {
        clickable: opts.clickable,
        opacity: opts.opacity,
        map: state.map,
      }),
    )
    setPrevBounds(opts.bounds)
    setPrevClickable(opts.clickable)
  }, [state.map])

  useEffect(() => {
    if (groundOverlay === undefined) return

    // Add the groundOverlay to state.objects
    addGroundOverlay(groundOverlay)

    // Remove the groundOverlay when the component is unmounted
    return () => removeGroundOverlay()
  }, [groundOverlay])

  // Register google map event listeners
  useGoogleListener(groundOverlay, [
    {name: 'click', handler: onClick},
    {name: 'dblclick', handler: onDoubleClick},
  ])

  // Modify the google.maps.GroundOverlay object when opacity changes
  useEffect(() => {
    if (groundOverlay === undefined) return
    if (opts.opacity && opts.opacity !== groundOverlay.getOpacity())
      groundOverlay.setOpacity(opts.opacity)
  }, [opts.opacity])

  // Recreate the object when url/bounds/clickable change
  useEffect(() => {
    if (state.map === undefined || groundOverlay === undefined) return
    if (
      opts.url !== groundOverlay.getUrl() ||
      !Object.is(JSON.stringify(opts.bounds), JSON.stringify(prevBounds)) ||
      opts.clickable !== prevClickable
    ) {
      console.log('handle recreation')
      setGroundOverlay(
        new google.maps.GroundOverlay(opts.url, opts.bounds, {
          clickable: opts.clickable,
          opacity: opts.opacity,
          map: state.map,
        }),
      )
      console.log(state.objects)
    }
  }, [opts.url, opts.bounds, opts.clickable])

  return null
}
