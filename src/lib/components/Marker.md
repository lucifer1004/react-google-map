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
    LoadedComponent={null}
  />
  <Marker id="marker" />
</GoogleMapProvider>
```
