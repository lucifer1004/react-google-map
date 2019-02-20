A simple StandaloneSearchBox:

```jsx
const {GoogleMapProvider, MapBox, StandaloneSearchBox} = require('../')

;<GoogleMapProvider>
  <MapBox
    style={{
      height: '50vh',
      width: '100%',
    }}
    usePlaces
  />
  <StandaloneSearchBox id="standalone-search-box" placeholder="Search..." />
</GoogleMapProvider>
```
