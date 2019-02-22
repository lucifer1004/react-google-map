import React from 'react'
import SearchBox from './SearchBox'
import {StandaloneSearchBoxProps} from '../common/types'

const StandaloneSearchBox = (props: StandaloneSearchBoxProps) => (
  <SearchBox {...props} />
)

StandaloneSearchBox.displayName = 'StandaloneSearchBox'

export default StandaloneSearchBox
