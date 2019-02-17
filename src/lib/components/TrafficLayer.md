Use TrafficLayer:

```jsx
const {GoogleMapProvider, MapBox, TrafficLayer} = require('../')

;<GoogleMapProvider>
  <MapBox
    mapStyle={{
      height: '50vh',
      width: '100%',
    }}
  />
  <TrafficLayer />
</GoogleMapProvider>
```
