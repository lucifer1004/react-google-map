# CHANGELOG

## [2.5.0] - <2019-02-13>

### ADDED

- Implement OverlayView

## [2.4.1] - <2019-02-12>

### FIXED

- Add a bounder for `HeatMap` in case `google.maps.visualization` is not ready.

## [2.4.0] - <2019-02-12>

### ADDED

- Implement HeatMap.

## [2.3.0] - <2019-02-07>

### CHANGED

- Upgrade to React 16.8.1.

## [2.2.1] - <2019-02-07>

### FIXED

- Remove debugging code which will cause `window.service` to be redefined.

## [2.2.0] - <2019-02-04>

### ADDED

- When `usePlaces` is specified in a `MapBox`, a service instance will be
  registered for later use.

## [2.1.0] - <2019-01-31>

### CHANGED

- `Marker` and `Polygon` now requires a unique `id` prop
- Use Map to store markers and polygons as `id-element` pairs

## [2.0.0] - <2019-01-28>

### CHANGED

- `MapBox` now requires `opts` prop (google.maps.MapOptions)
- `Marker` now requires `opts` prop (google.maps.MarkerOptions)
- `InfoWindow` now requires `opts` prop (google.maps.InfoWindowOptions)
- `Polygon` now requires `paths` and optionally requires `visible` and `opts`
  prop (google.maps.PolygonOptions). Options other than `paths` or `visible`
  should be set via `opts`.

## [1.0.1] - <2019-01-27>

### FIXED

- Add `lodash.isequal` to deps
- Clean up `package.json`

## [1.0.0] - <2019-01-27>

This is a breaking change.

### CHANGED

- Completely redesigned
- Now there is a global `GoogleMapContext`, users can use exposed
  `GoogleMapContext`, `GoogleMapProvider` and `GoogleMapConsumer`. All
  map-related components should be placed inside this context.
- `MapBox` no longer renders children.
- `MapBox` no longer uses `portalNode` or `PortalComponent`.

## [0.3.0] - <2019-01-26>

### ADDED

- `MapBox` now has two new props, `portalNode` and `PortalComponent`. Powered by
  React Portal, combined use of these two props can help you mount a component
  outside the `MapBox`, while it will still have access to `MapContext`.

## [0.2.3] - <2019-01-26>

### CHANGED

- `MapBox` now has a new prop `mapClass` so that users can define the style of
  the map content via a stylesheet
- `MapBox` prop `style` has been renamed to `mapStyle` to make its function
  clearer
