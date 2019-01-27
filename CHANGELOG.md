# CHANGELOG

## [0.4.0] - Unreleased

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
