import React from 'react'
import {storiesOf} from '@storybook/react'
import DefaultMapBox from './components/DefaultMapBox'
import MapBoxDefaultNotes from './notes/mapbox-default.md'

storiesOf('MapBox', module).add('default', () => <DefaultMapBox />, {
  notes: {markdown: MapBoxDefaultNotes},
})
