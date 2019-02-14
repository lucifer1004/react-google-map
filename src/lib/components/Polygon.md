A simple Polygon:

```jsx
const {GoogleMapProvider, MapBox, Polygon} = require('../')

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
  <Polygon
    id="polygon"
    paths={[
      {lat: 39, lng: 116},
      {lat: 39, lng: 116.01},
      {lat: 38.99, lng: 116.02},
    ]}
    visible
  />
</GoogleMapProvider>
```
