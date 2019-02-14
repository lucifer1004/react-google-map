A simple InfoWindow:

```jsx
const {GoogleMapProvider, MapBox, InfoWindow} = require('../')

;<GoogleMapProvider>
  <MapBox
    apiKey=""
    mapStyle={{
      height: '50vh',
      width: '100%',
    }}
    opts={{
      center: {lat: 39, lng: 116},
      zoom: 14,
    }}
    LoadedComponent={() => null}
  />
  <InfoWindow
    opts={{
      content: 'Hello Google Map',
      position: {lat: 39, lng: 116},
      zIndex: 10,
    }}
    visible
  />
</GoogleMapProvider>
```
