A simple Polygon:

```jsx
const {GoogleMapProvider, MapBox, Polygon} = require('../')

;<GoogleMapProvider>
  <MapBox
    mapStyle={{
      height: '50vh',
      width: '100%',
    }}
  />
  <Polygon id="polygon" />
</GoogleMapProvider>
```
