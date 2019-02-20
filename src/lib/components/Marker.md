A simple Marker:

```jsx
const {GoogleMapProvider, MapBox, Marker} = require('../')

;<GoogleMapProvider>
  <MapBox
    style={{
      height: '50vh',
      width: '100%',
    }}
  />
  <Marker
    id="marker"
    opts={{
      position: {
        lat: 40.7128,
        lng: -74.006,
      },
    }}
  />
</GoogleMapProvider>
```
