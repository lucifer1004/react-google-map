import React, {useContext, useEffect, useState} from 'react'
import {GoogleMapContext} from '../contexts/GoogleMapContext'
import {StreetViewProps} from '../common/types'

const StreetView: React.FunctionComponent<StreetViewProps> = ({
  separate = false,
}) => {
  const {state} = useContext(GoogleMapContext)
  return null
}

export default StreetView
