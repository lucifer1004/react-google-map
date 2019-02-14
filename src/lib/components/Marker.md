A simple Marker:

```jsx
const {GoogleMapProvider, MapBox, Marker} = require('../')

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
  <Marker
    id="marker"
    opts={{
      position: {lat: 39, lng: 116},
    }}
  />
</GoogleMapProvider>
```
