A simple StandaloneSearchBox:

```jsx
const {GoogleMapProvider, MapBox, StandaloneSearchBox} = require('../')

;<GoogleMapProvider>
  <MapBox
    mapStyle={{
      height: '50vh',
      width: '100%',
    }}
    usePlaces
  />
  <StandaloneSearchBox id="search-box" placeholder="Search..." />
</GoogleMapProvider>
```
