# React Google Map

[![version](https://img.shields.io/badge/%40lucifer1004%2Freact--google--map-2.0.0-blue.svg)](https://www.npmjs.com/package/@lucifer1004/react-google-map)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![codecov](https://codecov.io/gh/lucifer1004/react-google-map/branch/master/graph/badge.svg)](https://codecov.io/gh/lucifer1004/react-google-map)
[![codebeat badge](https://codebeat.co/badges/e7a5b064-277b-496d-9528-6fb835eb6ad4)](https://codebeat.co/projects/github-com-lucifer1004-react-google-map-master)

Easier Google Map Integration for React projects.

## Why a new package

There has been similar packages such as
[tomchentw/react-google-maps](https://github.com/tomchentw/react-google-maps),
[google-map-react/google-map-react](https://github.com/google-map-react/google-map-react),
[fullstackreact/google-maps-react](https://github.com/fullstackreact/google-maps-react),
so why bother writing a new library?

The aim is to make an easier-to-use Google Map library for React users,
empowered by React's latest features.

## Prerequisites

- node
- npm or yarn
- a valid Google Map API key

## Basic usage

```javascript
import {
  GoogleMapProvider,
  InfoWindow,
  MapBox,
  Marker,
  Polygon,
} from '@lucifer1004/react-google-map'

// In your component
return (
  <GoogleMapProvider>
    <MapBox
      apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY || ''}
      opts={{
        center: {lat: 39, lng: 116},
        noClear: true,
        zoom: 14,
      }}
      useDrawing={true}
      useGeometry={true}
      usePlaces={true}
      useVisualization={true}
      onCenterChanged={() => {
        console.log('The center of the map has changed.')
      }}
    />
    <Marker
      opts={{
        draggable: true,
        label: 'hello',
        position: {lat: 39, lng: 116},
      }}
    />
    <InfoWindow
      opts={{
        content: 'This is an info window',
        position: {lat: 39.01, lng: 115.99},
      }}
      visible
    />
    <Polygon
      paths={[
        {lat: 38.98, lng: 116.01},
        {lat: 38.98, lng: 116.03},
        {lat: 38.99, lng: 116.03},
      ]}
      visible
    />
  </GoogleMapProvider>
)
```

## Advanced usage

Instead of using the pre-designed components, you can also use the exposed hooks
`useGoogleAPI`, `useGoogleListeners` in your own components.

## See the examples

```sh
git clone https://github.com/lucifer1004/react-gmap
cd react-gmap
yarn install
```

### Storybook

The best way to learn how to use this package is to use the storybook.

```sh
yarn storybook
```

### App

You can also run the example app. Before running it locally, you should copy the
sample dotenv file, and fill in your Google Map API key to replace the
placeholder.

```sh
cp .env.sample .env
```

Then you can run the example project by

```sh
yarn start
```
