# react-gmap

To make Google Map API calls, first you need to apply for a Google Map API key.

## Basic usage

### Display a map

```javascript
import {MapBox} from '@lucifer1004/react-google-map'

// In your component
return <MapBox apiKey="Your Google Map API key" />
```

### Use other components

Other components should be placed within an instance of MapBox, so that they
will have access to that MapBox's context.

```javascript
import {MapBox, InfoWindow} from '@lucifer1004/react-google-map'

// In your component
return (
  <MapBox apiKey="" LoadedComponent={() => <h1>Display an info window</h1>}>
    <InfoWindow
      content="This is an info window"
      position={{lat: 39, lng: 116.002}}
    />
  </MapBox>
)
```

### Use `withMapContext` HOC

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
