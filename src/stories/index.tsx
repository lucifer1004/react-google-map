import React from 'react'
import {storiesOf} from '@storybook/react'
import MapBox from '../components/MapBox'

storiesOf('MapBox', module)
  .add('basic', () => (
    <MapBox apiKey="AIzaSyC6I-uL4lzPx0CzyOzyYSdnibxVrsfVy6g" />
  ))
  .add('basic2', () => <MapBox apiKey="" />)
