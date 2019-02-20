import React, {useContext, useEffect, useState} from 'react'
import ReactDOMServer from 'react-dom/server'
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
  const {state, dispatch} = useContext(GoogleMapContext)
  const [searchBox, setSearchBox] = useState<
    google.maps.places.SearchBox | undefined
  >(undefined)

  const addSearch = (search: google.maps.places.SearchBox) => {
    if (!state.searches.has(id))
      dispatch({type: 'add_search', search: search, id: id})
  }
  const removeSearch = () => dispatch({type: 'remove_search', id: id})

  // Create google.maps.places.SearchBox
  useEffect(() => {
    if (state.map === undefined || state.places === undefined) return
    const inputNode = (bindingPosition
      ? document
          .createRange()
          .createContextualFragment(
            ReactDOMServer.renderToString(<input id={id} {...restProps} />),
          ).firstElementChild
      : document.getElementById(id)) as HTMLInputElement
    const searchBox = new google.maps.places.SearchBox(inputNode, opts)
    setSearchBox(searchBox)
    addSearch(searchBox)
    if (bindingPosition)
      state.map.controls[google.maps.ControlPosition[bindingPosition]].push(
        inputNode,
      )
    return () => removeSearch()
  }, [state.places])

  // Register google map event listeners
  useGoogleListener(searchBox, [
    {name: 'places_changed', handler: onPlacesChanged},
  ])

  // Modify the google.maps.places.SearchBox object when component props change
  useEffect(() => {
    if (searchBox === undefined || opts.bounds === undefined) return
    searchBox.setBounds(opts.bounds)
  }, [opts.bounds])

  return bindingPosition ? null : <input id={id} {...restProps} />
}
