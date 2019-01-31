import React, {useContext, useEffect} from 'react'
import {GoogleMapAction} from '../common/types'
import {GoogleMapContext} from '../'

export default ({action}: {action: GoogleMapAction}) => {
  const {dispatch} = useContext(GoogleMapContext)
  const handleClick = () => dispatch(action)
  return <button onClick={handleClick}>Fake button</button>
}
