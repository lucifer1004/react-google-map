A simple MapBox:

```jsx
const {GoogleMapProvider, MapBox} = require('../')

;<GoogleMapProvider>
  <MapBox
    apiKey=""
    mapStyle={{
      height: '50vh',
      width: '100%',
    }}
    LoadedComponent={null}
  />
</GoogleMapProvider>
```
