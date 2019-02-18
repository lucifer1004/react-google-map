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
  <Marker id="marker" />
</GoogleMapProvider>
```
