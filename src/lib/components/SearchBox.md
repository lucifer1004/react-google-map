A simple SearchBox:

```jsx
const {GoogleMapProvider, MapBox, SearchBox} = require('../')

;<GoogleMapProvider>
  <MapBox
    style={{
      height: '50vh',
      width: '100%',
    }}
    usePlaces
  />
  <SearchBox
    id="search-box"
    placeholder="Search..."
    bindingPosition="TOP_CENTER"
  />
</GoogleMapProvider>
```
