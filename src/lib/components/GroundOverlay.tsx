import React, {useContext, useEffect, useState} from 'react'
import {useGoogleListener} from '../hooks'
import {DEFAULT_GROUND_OVERLAY_OPTIONS} from '../common/constants'
import {GroundOverlayProps} from '../common/types'
import {GoogleMapContext} from '../contexts/GoogleMapContext'

const GroundOverlay = ({
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
  const [prevClickable, setPrevClickable] = useState(true)
  const addGroundOverlay = (groundOverlay: google.maps.GroundOverlay) =>
    dispatch({type: 'add_object', object: groundOverlay, id: id})
  const removeGroundOverlay = () => dispatch({type: 'remove_object', id: id})

  const createGroundOverlay = () => {
    const groundOverlay = new google.maps.GroundOverlay(opts.url, opts.bounds, {
      clickable: opts.clickable,
      opacity: opts.opacity,
      map: state.map,
    })
    setGroundOverlay(groundOverlay)

    // Record bounds and clickable
    setPrevBounds(opts.bounds)
    setPrevClickable(opts.clickable === undefined ? true : opts.clickable)

    // Add the groundOverlay to state.objects
    addGroundOverlay(groundOverlay)
  }

  useEffect(() => {
    if (state.map === undefined) return
    createGroundOverlay()

    // Remove the groundOverlay when the component is unmounted
    return () => removeGroundOverlay()
  }, [state.map])

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
    const clickable = opts.clickable === undefined ? true : opts.clickable
    if (
      opts.url !== groundOverlay.getUrl() ||
      !Object.is(JSON.stringify(opts.bounds), JSON.stringify(prevBounds)) ||
      clickable !== prevClickable
    ) {
      removeGroundOverlay()
      createGroundOverlay()
    }
  }, [opts.url, opts.bounds, opts.clickable])

  return null
}

GroundOverlay.displayName = 'GroundOverlay'

export default GroundOverlay
