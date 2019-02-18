import React, {useContext, useEffect, useState} from 'react'
import {useGoogleListener} from '../hooks'
import {DEFAULT_SEARCH_BOX_OPTIONS} from '../common/constants'
import {SearchBoxProps} from '../common/types'
import {GoogleMapContext} from '../contexts/GoogleMapContext'

export default ({
  id,
  opts = DEFAULT_SEARCH_BOX_OPTIONS,
  onPlacesChanged,
  bindingPosition,
  ...restProps
}: SearchBoxProps) => {
  const {state} = useContext(GoogleMapContext)
  const [searchBox, setSearchBox] = useState<
    google.maps.places.SearchBox | undefined
  >(undefined)
  const inputNode = document.getElementById(id) as HTMLInputElement

  useEffect(() => {
    if (state.map === undefined || state.places === undefined) return
    setSearchBox(new google.maps.places.SearchBox(inputNode, opts))
    if (bindingPosition) {
      state.map.controls[google.maps.ControlPosition[bindingPosition]].push(
        inputNode,
      )
      inputNode.hidden = restProps.hidden ? restProps.hidden : false
    }
  }, [state.places])

  useGoogleListener(searchBox, [
    {name: 'places_changed', handler: onPlacesChanged},
  ])

  // Modify the google.maps.places.SearchBox object when component props change
  useEffect(() => {
    if (searchBox === undefined || opts.bounds === undefined) return
    console.log(searchBox)
    searchBox.setBounds(opts.bounds)
  }, [opts.bounds])

  // If `hidden` is not defined in props, search boxes bound to map will be hidden at first.
  return (
    <input
      id={id}
      hidden={restProps.hidden ? restProps.hidden : !!bindingPosition}
      {...restProps}
    />
  )
}
