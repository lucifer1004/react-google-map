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
    LoadedComponent={null}
  />
  <Polygon id="polygon" />
</GoogleMapProvider>
```
